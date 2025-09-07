import type { APIRoute } from 'astro';
import { loadProps } from '../lib/loadProps';

export const GET: APIRoute = async () => {
  const base = 'https://example.com';
  const urls: string[] = [];
  const locales: any[] = ['de','en','th'];

  for (const L of locales) {
    urls.push(`${base}/${L}/`, `${base}/${L}/properties/`, `${base}/${L}/services/`, `${base}/${L}/districts/`, `${base}/${L}/contact/`);
    const props = await loadProps(L);
    props.forEach(p => urls.push(base + p.url));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(u => `<url><loc>${u}</loc></url>`).join('')}
  </urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' }});
}
