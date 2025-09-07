import * as React from 'react';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { Menu, Globe } from 'lucide-react';
import { routes, mainNav } from '../lib/routes';

export default function NavBar({ locale='de' }: { locale?: 'de'|'en'|'th' }) {
  const nav = mainNav(locale as any);
  const [open,setOpen] = React.useState(false);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isActive = (href:string)=> pathname.startsWith(href);

  // Locale switch: versucht aktuellen Pfad zu spiegeln
  const switchLocale = (target:'de'|'en'|'th') => {
    if (typeof window === 'undefined') return;
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) { window.location.href = routes.home(target); return; }
    parts[0] = target;
    window.location.href = '/' + parts.join('/') + (window.location.pathname.endsWith('/') ? '/' : '/');
  };

  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href={`/${locale}/`} className="font-semibold tracking-tight">Weib-Coding</a>
        <nav className={cn('gap-5 items-center hidden md:flex')}>
          {nav.map(item => (
            <a key={item.href} href={item.href} className={cn('text-sm', isActive(item.href) && 'font-semibold underline')}>
              {item.label}
            </a>
          ))}
          <div className="opacity-50">|</div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="opacity-70" />
            <button className="text-sm underline" onClick={()=>switchLocale('de')}>DE</button>
            <button className="text-sm underline" onClick={()=>switchLocale('en')}>EN</button>
            <button className="text-sm underline" onClick={()=>switchLocale('th')}>TH</button>
          </div>
          <Button variant="default" size="sm" className="ml-2" onClick={()=>{window.location.href = `/${locale}/contact/`;}}>Anfrage</Button>
        </nav>
        <button onClick={()=>setOpen(!open)} className="md:hidden p-2 rounded-xl border border-gray-200">
          <Menu size={18}/>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t px-4 pb-4 grid gap-3">
          {nav.map(item => <a key={item.href} href={item.href} className={cn('text-sm', isActive(item.href) && 'font-semibold underline')}>{item.label}</a>)}
          <div className="flex gap-3 items-center">
            <Globe size={16} className="opacity-70" />
            <button className="text-sm underline" onClick={()=>switchLocale('de')}>DE</button>
            <button className="text-sm underline" onClick={()=>switchLocale('en')}>EN</button>
            <button className="text-sm underline" onClick={()=>switchLocale('th')}>TH</button>
          </div>
        </div>
      )}
    </header>
  );
}
