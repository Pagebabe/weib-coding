# Custom Domain Setup Guide

## Vercel Domain Configuration

### 1. Domain hinzufügen
1. **Vercel Dashboard** → **Project** → **Settings** → **Domains**
2. **Add Domain** klicken
3. Deine Domain eingeben (z.B. `paattaya.space`)
4. **Add** klicken

### 2. DNS-Konfiguration
Vercel zeigt dir die DNS-Einstellungen:

#### Option A: Root Domain (paattaya.space)
```
Type: A
Name: @
Value: 76.76.19.61
```

#### Option B: Subdomain (www.paattaya.space)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Astro Config aktualisieren
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://paattaya.space', // Deine Domain
  // ... rest der Konfiguration
});
```

### 4. SSL-Zertifikat
- ✅ **Automatisch** von Vercel bereitgestellt
- ✅ **Let's Encrypt** Zertifikat
- ✅ **Auto-Renewal**

## DNS Provider Setup

### Cloudflare (empfohlen)
1. **Domain zu Cloudflare hinzufügen**
2. **DNS Records setzen**:
   ```
   Type: A
   Name: @
   Content: 76.76.19.61
   Proxy: Off
   
   Type: CNAME
   Name: www
   Content: cname.vercel-dns.com
   Proxy: Off
   ```

### GoDaddy
1. **DNS Management** → **DNS Records**
2. **A Record** für Root Domain
3. **CNAME Record** für www

### Namecheap
1. **Advanced DNS** → **Add New Record**
2. **A Record** für Root Domain
3. **CNAME Record** für www

## Redirects konfigurieren

### Vercel vercel.json
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "https://paattaya.space/$1",
      "permanent": true,
      "has": [
        {
          "type": "host",
          "value": "weib-coding.vercel.app"
        }
      ]
    }
  ]
}
```

## Testing
1. **DNS Propagation prüfen**: https://dnschecker.org
2. **SSL-Zertifikat testen**: https://www.ssllabs.com/ssltest/
3. **Website erreichbar**: https://paattaya.space

## Troubleshooting
- **DNS nicht propagiert**: 24-48h warten
- **SSL-Fehler**: Vercel Dashboard → Domains → SSL Status prüfen
- **Redirect-Loop**: vercel.json Redirects prüfen
