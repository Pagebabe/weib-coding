# 🏠 Weib-Coding Immobilien Website

Eine professionelle, mehrsprachige Immobilien-Website für Pattaya, Thailand.

## 🌐 Live-Website

**🔗 [https://weib-coding.vercel.app](https://weib-coding.vercel.app)**

## ✨ Features

- **🌍 Mehrsprachig:** Deutsch, Englisch, Thai
- **🏠 Immobilien-Listings:** Mit Filter, Suche und Detail-Seiten
- **📱 Responsive Design:** Optimiert für alle Geräte
- **🔍 SEO-optimiert:** Schema.org, Open Graph, Sitemap
- **📝 CMS:** Decap CMS für Content-Management
- **📊 Analytics:** Vercel Analytics integriert
- **⚡ Performance:** Astro + React Islands

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **CMS:** [Decap CMS](https://decapcms.org/)
- **Hosting:** [Vercel](https://vercel.com/)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)

## 🚀 Quick Start

```bash
# Repository klonen
git clone https://github.com/Pagebabe/weib-coding.git
cd weib-coding

# Dependencies installieren
npm install

# Lokale Entwicklung starten
npm run dev

# Website öffnen: http://localhost:4321
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Startet lokalen Dev-Server |
| `npm run build` | Erstellt Production Build |
| `npm run preview` | Preview des Production Builds |
| `npm run cms` | Startet CMS-Server lokal |
| `make import-csv` | Importiert Properties aus CSV |
| `make archive-migration` | Migriert HTML-Archiv |

## 📁 Projekt-Struktur

```
weib-coding/
├── src/
│   ├── pages/              # Mehrsprachige Seiten
│   │   ├── de/            # Deutsche Seiten
│   │   ├── en/            # Englische Seiten
│   │   └── th/            # Thai Seiten
│   ├── components/        # React + Astro Komponenten
│   ├── layouts/           # Base-Layouts
│   └── content/           # Properties & Content
├── admin/                 # Decap CMS
├── api/                   # Vercel Functions
├── scripts/               # Migration & Import Tools
└── public/                # Statische Assets
```

## 🏠 Properties

Die Website zeigt aktuell 4 Sample Properties:

1. **Park Villa mit Privatpool** - Villa in Jomtien
2. **Luxus Condo Pattaya Beach** - Condo am Strand
3. **Familienhaus Naklua** - Haus für Familien
4. **Modernes Apartment Central** - Apartment zentral

## 📝 Content Management

### Lokales CMS
```bash
npm run cms
# Öffne: http://localhost:8081/admin/
```

### Online CMS (nach Setup)
- **URL:** https://weib-coding.vercel.app/admin/
- **Setup:** Siehe [CMS-SETUP.md](./CMS-SETUP.md)

## 🔧 Konfiguration

### Environment Variables
```bash
# GitHub OAuth für CMS
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Für lokale Entwicklung
ARCHIVE_PATH=/path/to/your/archive
```

### CSV-Import
Properties können via CSV importiert werden:
```bash
# CSV-Datei bearbeiten: imports/properties.csv
make import-csv
```

## 📊 SEO & Performance

- **Schema.org Markup** für Immobilien
- **Open Graph** für Social Media
- **Sitemap.xml** automatisch generiert
- **Vercel Analytics** für Monitoring
- **Lighthouse Score** > 90

## 🌐 Deployment

Das Projekt ist vollständig automatisiert:
- **Git Push** → **Automatischer Deploy**
- **CMS-Änderungen** → **Automatischer Deploy**
- **Environment Variables** → **Redeploy erforderlich**

## 📈 Nächste Schritte

1. **Custom Domain** verbinden
2. **GitHub OAuth** für CMS einrichten
3. **Echte Properties** via CSV importieren
4. **Kontakt-Formular** mit E-Mail-Service verbinden

## 📚 Dokumentation

- [Deployment Guide](./DEPLOYMENT-GUIDE.md)
- [CMS Setup](./CMS-SETUP.md)
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork das Repository
2. Erstelle einen Feature Branch
3. Committe deine Änderungen
4. Push zum Branch
5. Öffne einen Pull Request

## 📄 License

MIT License - siehe [LICENSE](./LICENSE) für Details.

---

**🎉 Eine professionelle Immobilien-Website, bereit für echte Kunden!**