# Analytics & Monitoring Setup

## Vercel Analytics (bereits aktiv)
- ✅ Automatisch aktiviert
- ✅ Dashboard: https://vercel.com/dashboard
- ✅ Metriken: Page Views, Performance, Core Web Vitals

## Google Analytics 4 (optional)
1. **Google Analytics Account erstellen**
   - Gehe zu: https://analytics.google.com
   - Erstelle Property für deine Domain
   - Kopiere Measurement ID (GA_MEASUREMENT_ID)

2. **In Vercel Environment Variables setzen**
   - Vercel Dashboard → Settings → Environment Variables
   - `GA_MEASUREMENT_ID` = deine Google Analytics ID

3. **Google Tag Manager Script hinzufügen**
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## Performance Monitoring
- ✅ **Core Web Vitals** bereits implementiert
- ✅ **Lazy Loading** für bessere Performance
- ✅ **Content-Visibility** für optimiertes Rendering

## Custom Events (optional)
```javascript
// Property View Tracking
gtag('event', 'property_view', {
  property_id: 'park-villa-privatpool',
  property_type: 'villa',
  property_price: 12500000
});

// Filter Usage Tracking
gtag('event', 'filter_used', {
  filter_type: 'price_range',
  filter_value: '5000000-10000000'
});
```

## Monitoring Dashboard
- **Vercel Analytics**: https://vercel.com/dashboard
- **Google Analytics**: https://analytics.google.com
- **Lighthouse**: Chrome DevTools → Lighthouse
- **Core Web Vitals**: https://web.dev/vitals/
