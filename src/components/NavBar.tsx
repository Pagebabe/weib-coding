import * as React from 'react';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { Menu, Globe } from 'lucide-react';
import { routes, mainNav } from '../lib/routes';
import ThemeToggle from './ThemeToggle';

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
    <header className="border-b bg-white/70 backdrop-blur" style={{borderColor: 'var(--card-border)'}}>
      <div className="container py-4 flex items-center justify-between">
        <a href={`/${locale}/`} className="font-semibold tracking-tight text-xl" style={{color: 'var(--color-text)'}}>Weib-Coding</a>
        <nav className={cn('gap-6 items-center hidden md:flex')}>
          {nav.map(item => (
            <a 
              key={item.href} 
              href={item.href} 
              className={cn(
                'text-sm transition-colors hover:opacity-80',
                isActive(item.href) ? 'font-semibold' : 'font-normal'
              )}
              style={{
                color: isActive(item.href) ? 'var(--color-primary)' : 'var(--color-text)',
                textDecoration: isActive(item.href) ? 'underline' : 'none'
              }}
            >
              {item.label}
            </a>
          ))}
          <div className="opacity-30">|</div>
                 <div className="flex items-center gap-3">
                   <Globe size={16} style={{color: 'var(--color-muted)'}} />
                   <button
                     className="text-sm font-medium transition-colors hover:opacity-80"
                     style={{color: locale === 'de' ? 'var(--color-primary)' : 'var(--color-muted)'}}
                     onClick={()=>switchLocale('de')}
                   >
                     DE
                   </button>
                   <button
                     className="text-sm font-medium transition-colors hover:opacity-80"
                     style={{color: locale === 'en' ? 'var(--color-primary)' : 'var(--color-muted)'}}
                     onClick={()=>switchLocale('en')}
                   >
                     EN
                   </button>
                   <button
                     className="text-sm font-medium transition-colors hover:opacity-80"
                     style={{color: locale === 'th' ? 'var(--color-primary)' : 'var(--color-muted)'}}
                     onClick={()=>switchLocale('th')}
                   >
                     TH
                   </button>
                   <div className="opacity-30">|</div>
                   <ThemeToggle client:load />
                 </div>
          <Button 
            variant="default" 
            size="sm" 
            className="ml-2" 
            style={{backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)'}}
            onClick={()=>{window.location.href = `/${locale}/contact/`;}}
          >
            Anfrage
          </Button>
        </nav>
        <button 
          onClick={()=>setOpen(!open)} 
          className="md:hidden p-2 rounded-xl border transition-colors hover:bg-gray-50"
          style={{borderColor: 'var(--card-border)'}}
        >
          <Menu size={18} style={{color: 'var(--color-text)'}}/>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t px-4 pb-4 grid gap-3" style={{borderColor: 'var(--card-border)'}}>
          {nav.map(item => (
            <a 
              key={item.href} 
              href={item.href} 
              className={cn(
                'text-sm transition-colors',
                isActive(item.href) ? 'font-semibold' : 'font-normal'
              )}
              style={{
                color: isActive(item.href) ? 'var(--color-primary)' : 'var(--color-text)',
                textDecoration: isActive(item.href) ? 'underline' : 'none'
              }}
            >
              {item.label}
            </a>
          ))}
                 <div className="flex gap-3 items-center">
                   <Globe size={16} style={{color: 'var(--color-muted)'}} />
                   <button
                     className="text-sm font-medium transition-colors"
                     style={{color: locale === 'de' ? 'var(--color-primary)' : 'var(--color-muted)'}}
                     onClick={()=>switchLocale('de')}
                   >
                     DE
                   </button>
                   <button
                     className="text-sm font-medium transition-colors"
                     style={{color: locale === 'en' ? 'var(--color-primary)' : 'var(--color-muted)'}}
                     onClick={()=>switchLocale('en')}
                   >
                     EN
                   </button>
                   <button
                     className="text-sm font-medium transition-colors"
                     style={{color: locale === 'th' ? 'var(--color-primary)' : 'var(--color-muted)'}}
                     onClick={()=>switchLocale('th')}
                   >
                     TH
                   </button>
                   <ThemeToggle client:load />
                 </div>
        </div>
      )}
    </header>
  );
}
