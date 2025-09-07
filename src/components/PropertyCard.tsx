import * as React from 'react';
import { Card, CardBody } from './ui/card';
import { trackPropertyClick } from '../lib/analytics';

type P = { url:string; title:string; cover?:string; location?:string; type:string; bedrooms:number; price_thb:number; };

export default function PropertyCard({ p }: { p:P }) {
  const handleClick = () => {
    trackPropertyClick(p.url, p.title);
  };

  return (
    <a href={p.url} className="block" onClick={handleClick}>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg motion-safe:animate-[cardin_280ms_ease-out]">
        <img 
          src={p.cover || ''} 
          alt={p.title} 
          className="w-full aspect-[4/3] object-cover" 
          loading="lazy"
          decoding="async"
        />
        <CardBody>
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm text-gray-600">{p.location || 'Pattaya'} · {p.type} · {p.bedrooms} BR</p>
          <p className="mt-1 font-mono">{new Intl.NumberFormat('de-DE').format(p.price_thb)} THB</p>
        </CardBody>
      </Card>
    </a>
  );
}
