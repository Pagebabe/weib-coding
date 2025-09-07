// kleine Helper-Funktionen zum Laden/Filtern nach Locale
type Prop = {
  slug: string; url: string; title: string; price_thb: number; type: string;
  bedrooms: number; living_sqm?: number|null; land_sqm?: number|null;
  location?: string; ownership?: string; features?: string[];
  cover?: string; images?: string[]; description?: string; body?: string;
};

export async function loadProps(locale: 'de'|'en'|'th'): Promise<Prop[]> {
  const modules = import.meta.glob('../content/properties/*.{de,en,th}.json', { eager: true });
  const items: Prop[] = [];
  for (const [file, mod] of Object.entries(modules)) {
    const data = (mod as any).default as Prop;
    if (file.endsWith(`.${locale}.json`)) items.push(data);
  }
  // einfache Sortierung: neueste zuerst -> nach Titel/Slug zur Reproduzierbarkeit
  return items.sort((a,b) => a.title.localeCompare(b.title));
}

export async function loadPropBySlug(locale: 'de'|'en'|'th', slug: string): Promise<Prop|null> {
  const list = await loadProps(locale);
  return list.find(p => p.slug === slug) ?? null;
}
