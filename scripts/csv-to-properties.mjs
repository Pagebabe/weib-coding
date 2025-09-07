import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const CSV_PATH = 'imports/properties.csv';
const OUT_DIR = 'src/content/properties';

const csv = fs.readFileSync(CSV_PATH, 'utf8');
const rows = parse(csv, { columns: true, skip_empty_lines: true });

fs.mkdirSync(OUT_DIR, { recursive: true });

const toArr = (s) => (s ? String(s).split('|').map(x=>x.trim()).filter(Boolean) : []);
const toList = (s) => (s ? String(s).split(/;|\|/).map(x=>x.trim()).filter(Boolean) : []);

let created = 0;
for (const r of rows) {
  const base = {
    slug: r.slug,
    price_thb: Number(r.price_thb || 0),
    type: r.type || 'condo',
    bedrooms: Number(r.bedrooms || 1),
    living_sqm: r.living_sqm ? Number(r.living_sqm) : null,
    land_sqm: r.land_sqm ? Number(r.land_sqm) : null,
    location: r.location || 'Pattaya',
    ownership: r.ownership || 'Thai Quota',
    features: toList(r.features),
    cover: r.cover || '',
    images: toArr(r.images),
  };

  const makeRec = (L, title, desc) => ({
    ...base,
    url: `/${L}/properties/${r.slug}/`,
    title: title || r.slug,
    description: desc || title || r.slug,
    body: desc || ''
  });

  const de = makeRec('de', r.title_de || r.title_en, r.description_de || r.description_en);
  const en = makeRec('en', r.title_en || r.title_de, r.description_en || r.description_de);
  const th = makeRec('th', r.title_en || r.title_de, r.description_en || r.description_de);

  fs.writeFileSync(path.join(OUT_DIR, `${r.slug}.de.json`), JSON.stringify(de, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, `${r.slug}.en.json`), JSON.stringify(en, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, `${r.slug}.th.json`), JSON.stringify(th, null, 2));
  created += 3;
}

console.log(JSON.stringify({ rows: rows.length, created }, null, 2));
