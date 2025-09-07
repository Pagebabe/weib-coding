import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CSV_PATH = path.join(ROOT, 'imports/properties.csv');
const OUT_DIR = path.join(ROOT, 'src/content/properties');

// util
const toArr = (s) => (s ? String(s).split('|').map(x=>x.trim()).filter(Boolean) : []);
const toList = (s) => (s ? String(s).split(/;|\|/).map(x=>x.trim()).filter(Boolean) : []);
const toNum = (s) => {
  if (s === undefined || s === null || s === '') return null;
  const n = Number(String(s).replace(/[,\s]+/g,''));
  return Number.isFinite(n) ? n : null;
};
const toInt = (s) => {
  const n = toNum(s);
  return n === null ? null : Math.round(n);
};
const normType = (s) => (String(s||'condo').toLowerCase());
const normFor = (s) => (String(s||'sale').toLowerCase()==='rent'?'rent':'sale');
const normStatus = (s) => {
  const v = String(s||'available').toLowerCase();
  return ['available','reserved','sold','rented'].includes(v)?v:'available';
};
const normFurnishing = (s) => {
  const v = String(s||'furnished').toLowerCase();
  if (['unfurnished','partly','furnished'].includes(v)) return v;
  return 'furnished';
};
const slugify = (s) => String(s||'')
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

// prepare
fs.mkdirSync(OUT_DIR, { recursive: true });
const csv = fs.readFileSync(CSV_PATH, 'utf8');
const rows = parse(csv, { columns: true, skip_empty_lines: true });

let created = 0, errors = [], warnings = [];

// Import loop
for (const r of rows) {
  const slug = r.slug?.trim() || slugify(r.title_en || r.title_de || r.title_th || 'property');
  const base = {
    slug,
    // shared fields
    price_thb: Number(toNum(r.price_thb) || 0),
    type: normType(r.type),
    for: normFor(r.for),
    bedrooms: Number(toInt(r.bedrooms) || 0),
    bathrooms: Number(toInt(r.bathrooms) || 0),
    living_sqm: toNum(r.living_sqm),
    land_sqm: toNum(r.land_sqm),
    floor: toInt(r.floor),
    year_built: toInt(r.year_built),
    location: r.location?.trim() || 'Pattaya',
    district: r.district?.trim() || undefined,
    ownership: r.ownership?.trim() || 'Thai Quota',
    project: r.project?.trim() || undefined,
    status: normStatus(r.status),
    furnishing: normFurnishing(r.furnishing),
    features: toList(r.features),
    amenities: toList(r.amenities),
    parking: r.parking?.trim() || undefined,
    fees_hoa_thb: toNum(r.fees_hoa_thb) ?? undefined,
    lat: r.lat !== "" && r.lat !== undefined ? Number(r.lat) : null,
    lng: r.lng !== "" && r.lng !== undefined ? Number(r.lng) : null,
    cover: r.cover?.trim() || '',
    images: toArr(r.images),
    video_url: r.video_url?.trim() || undefined,
  };

  const makeLoc = (L, title, desc) => ({
    ...base,
    url: `/${L}/properties/${slug}/`,
    title: (title?.trim() || slug),
    description: (desc?.trim() || title?.trim() || slug),
    body: desc?.trim() || ''
  });

  const de = makeLoc('de', r.title_de, r.description_de);
  const en = makeLoc('en', r.title_en, r.description_en);
  const th = makeLoc('th', r.title_th || r.title_en || r.title_de, r.description_th || r.description_en || r.description_de);

  const candidates = [{L:'de',rec:de},{L:'en',rec:en},{L:'th',rec:th}];

  for (const {L,rec} of candidates) {
    try {
      // Basic validation
      if (!rec.title || !rec.slug) {
        throw new Error('Missing required fields: title, slug');
      }
      const out = path.join(OUT_DIR, `${slug}.${L}.json`);
      fs.writeFileSync(out, JSON.stringify(rec, null, 2));
      created++;
    } catch (e) {
      errors.push({ slug, locale: L, message: e?.message?.slice(0,400) || String(e) });
    }
  }

  if (!base.images?.length && !base.cover) {
    warnings.push({ slug, warn: 'no_images' });
  }
}

console.log(JSON.stringify({ rows: rows.length, created, errors, warnings }, null, 2));