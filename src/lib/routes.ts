export type Locale = 'de'|'en'|'th';

export const routes = {
  home:    (l:Locale)=> `/${l}/`,
  props:   (l:Locale)=> `/${l}/properties/`,
  services:(l:Locale)=> `/${l}/services/`,
  dists:   (l:Locale)=> `/${l}/districts/`,
  contact: (l:Locale)=> `/${l}/contact/`,
  about:   (l:Locale)=> `/${l}/about/`,
  legal:   {
    impressum: (l:Locale)=> `/${l}/legal/impressum/`,
    privacy:   (l:Locale)=> `/${l}/legal/privacy/`,
  },
  propDetail: (l:Locale, slug:string)=> `/${l}/properties/${slug}/`,
  distDetail: (l:Locale, slug:string)=> `/${l}/districts/${slug}/`,
} as const;

export const mainNav = (l:Locale)=> ([
  { href: routes.props(l),    label: {de:'Immobilien', en:'Properties', th:'ทรัพย์สิน'}[l] },
  { href: routes.services(l), label: {de:'Service', en:'Services', th:'บริการของเรา'}[l] },
  { href: routes.dists(l),    label: {de:'Stadtteile', en:'Districts', th:'เขตพื้นที่'}[l] },
  { href: routes.contact(l),  label: {de:'Kontakt', en:'Contact', th:'ติดต่อ'}[l] },
]);
