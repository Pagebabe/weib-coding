import fs from "fs";
import path from "path";
import fg from "fast-glob";
import { JSDOM } from "jsdom";
import TurndownService from "turndown";
import matter from "gray-matter";
import slugify from "slugify";
import { mkdirp } from "mkdirp";

const SRC_DIR = "imports/old_html";
const IMG_OUT_DIR = "public/images/archiv";
const PAGES_OUT_DIR = "src/content/pages";
const DIST_OUT_DIR = "src/content/districts";
const PROP_OUT_DIR = "src/content/properties";

const turndown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });

const ensure = async (p) => mkdirp(p);
const readFile = (p) => fs.readFileSync(p, "utf8");
const writeFile = (p, c) => fs.writeFileSync(p, c);

const guessLocale = (s) => {
  const low = s.toLowerCase();
  if (/-en(\.|-)|_en\./.test(low)) return "en";
  if (/-th(\.|-)|_th\./.test(low)) return "th";
  return "de";
};
const guessDistrict = (text) => {
  const t = text.toLowerCase();
  if (t.includes("jomtien")) return "jomtien";
  if (t.includes("pratumnak")) return "pratumnak";
  if (t.includes("naklua") || t.includes("wongamat")) return "naklua-wongamat";
  if (t.includes("east pattaya")) return "east-pattaya";
  return null;
};
const toSlug = (s) =>
  slugify(String(s || "").trim().slice(0, 80), { lower: true, strict: true }) || "seite";

const priceFromText = (t) => {
  const m = t.replace(/[,.\s]/g, "").match(/(\d{6,12})thb|\b(\d{6,12})\b/i);
  return m ? Number(m[1] || m[2]) : null;
};
const bedroomsFromText = (t) => {
  const m = t.match(/(\d+)\s*(bed(room)?|schlafzimmer)/i);
  return m ? Number(m[1]) : null;
};
const sqmFromText = (t) => {
  const m = t.match(/(\d{2,4})\s*(sqm|m2|m²)/i);
  return m ? Number(m[1]) : null;
};
const typeFromText = (t) => {
  const low = t.toLowerCase();
  if (low.includes("villa")) return "villa";
  if (low.includes("condo") || low.includes("eigentumswohnung") || low.includes("apartment"))
    return "condo";
  if (low.includes("house") || low.includes("haus")) return "house";
  return "apartment";
};

const isProbablyProperty = (dom) => {
  const doc = dom.window.document;
  const txt = doc.body.textContent || "";
  const hasGallery = doc.querySelectorAll("img").length >= 2;
  const hasPrice = /thb|฿|\bprice\b|\bpreis\b/i.test(txt) || priceFromText(txt);
  return hasGallery && hasPrice;
};

const normalizeImg = (src) => {
  if (!src) return null;
  try {
    const u = new URL(src, "http://placeholder/");
    const filename = path.basename(u.pathname).split("?")[0];
    return { filename, src };
  } catch {
    const filename = path.basename(src).split("?")[0];
    return { filename, src };
  }
};

async function run() {
  await ensure(IMG_OUT_DIR);
  await ensure(PAGES_OUT_DIR);
  await ensure(DIST_OUT_DIR);
  await ensure(PROP_OUT_DIR);

  const files = await fg(["**/*.html", "**/*.htm"], { cwd: SRC_DIR, absolute: true });
  let createdPages = 0, createdProps = 0, copiedImgs = 0;

  for (const file of files) {
    const html = readFile(file);
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const title = (document.querySelector("title")?.textContent || "Seite").trim();
    const locale = guessLocale(path.basename(file));
    const body = document.body;

    // Bilder einsammeln
    const imgs = Array.from(body.querySelectorAll("img"))
      .map((img) => normalizeImg(img.getAttribute("src")))
      .filter(Boolean);

    // Bilder kopieren (nur lokale/relative, remote lassen wir als URL stehen)
    for (const img of imgs) {
      if (/^https?:\/\//i.test(img.src)) continue;
      const srcPath = path.resolve(path.dirname(file), img.src);
      if (fs.existsSync(srcPath)) {
        const outName = `${Date.now()}-${img.filename}`;
        const outPath = path.join(IMG_OUT_DIR, outName);
        try {
          fs.copyFileSync(srcPath, outPath);
          img.copied = `/images/archiv/${outName}`;
          copiedImgs++;
        } catch {}
      }
    }

    // HTML → Markdown
    const main = document.querySelector("main") || document.body;
    const md = turndown.turndown(main.innerHTML);

    if (isProbablyProperty(dom)) {
      // Property JSON generieren
      const text = document.body.textContent || "";
      const price = priceFromText(text) || 0;
      const bedrooms = bedroomsFromText(text) || 1;
      const living = sqmFromText(text) || 0;
      const district = guessDistrict(text);
      const type = typeFromText(text);
      const slug = toSlug(title);

      const images = imgs.map((i) => i.copied ? i.copied : i.src).filter(Boolean);
      const cover = images[0] || "/images/sample/villa-main.jpg";

      const rec = {
        slug,
        url: `/${locale}/properties/${slug}/`,
        title,
        price_thb: price,
        type,
        bedrooms,
        living_sqm: living,
        land_sqm: null,
        location: district ? district.replace("-", " ") : "Pattaya",
        ownership: "Thai Quota",
        features: [],
        cover,
        images,
        description: title,
        body: md.replace(/\n{3,}/g, "\n\n")
      };

      const outFile = path.join(PROP_OUT_DIR, `${slug}.${locale}.json`);
      writeFile(outFile, JSON.stringify(rec, null, 2));
      createdProps++;
    } else {
      // Seite oder District
      const district = guessDistrict(title + " " + md);
      const slug = toSlug(title);
      const fm = {
        title,
        locale,
        slug,
        images: imgs.map((i) => i.copied ? i.copied : i.src).filter(Boolean)
      };
      const content = matter.stringify(md.trim() || "# " + title, fm);

      const outDir = district ? DIST_OUT_DIR : PAGES_OUT_DIR;
      const outFile = path.join(outDir, `${slug}.${locale}.md`);
      writeFile(outFile, content);
      createdPages++;
    }
  }

  console.log(JSON.stringify({
    migrated_html_files: files.length,
    created_pages: createdPages,
    created_properties: createdProps,
    copied_images: copiedImgs
  }, null, 2));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
