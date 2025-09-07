import * as React from 'react';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { Menu } from 'lucide-react';

export default function NavBar({ locale='de' }: { locale?: 'de'|'en'|'th' }) {
  const link = (l:string) => `/${locale}/${l}/`;
  const [open,setOpen] = React.useState(false);
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href={`/${locale}/`} className="font-semibold tracking-tight">Weib-Coding</a>
        <nav className={cn('gap-5 items-center hidden md:flex')}>
          <a href={link('properties')} className="text-sm">Immobilien</a>
          <a href={link('services')} className="text-sm">Service</a>
          <a href={link('districts')} className="text-sm">Stadtteile</a>
          <a href={link('contact')} className="text-sm">Kontakt</a>
          <div className="opacity-50">|</div>
          <a href="/de/" className="text-sm">DE</a>
          <a href="/en/" className="text-sm">EN</a>
          <a href="/th/" className="text-sm">TH</a>
          <Button variant="default" size="sm" className="ml-2" onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>Anfrage</Button>
        </nav>
        <button onClick={()=>setOpen(!open)} className="md:hidden p-2 rounded-xl border border-gray-200">
          <Menu size={18}/>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t px-4 pb-4 grid gap-3">
          <a href={link('properties')} className="text-sm">Immobilien</a>
          <a href={link('services')} className="text-sm">Service</a>
          <a href={link('districts')} className="text-sm">Stadtteile</a>
          <a href={link('contact')} className="text-sm">Kontakt</a>
          <div className="flex gap-3">
            <a href="/de/" className="text-sm">DE</a>
            <a href="/en/" className="text-sm">EN</a>
            <a href="/th/" className="text-sm">TH</a>
          </div>
        </div>
      )}
    </header>
  );
}
