# Decap CMS Setup für weib-coding

## GitHub OAuth App erstellen

1. **Gehe zu GitHub Settings:**
   - https://github.com/settings/applications/new

2. **OAuth App konfigurieren:**
   - **Application name:** `weib-coding-cms`
   - **Homepage URL:** `https://weib-coding.vercel.app`
   - **Authorization callback URL:** `https://weib-coding.vercel.app/api/oauth`

3. **Client ID & Secret kopieren:**
   - Speichere die `Client ID` und `Client Secret`

## Vercel Environment Variables setzen

1. **Gehe zu Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Wähle dein `weib-coding` Projekt

2. **Settings → Environment Variables:**
   - `GITHUB_CLIENT_ID` = deine GitHub Client ID
   - `GITHUB_CLIENT_SECRET` = dein GitHub Client Secret

3. **Redeploy:**
   - Trigger einen neuen Deploy nach dem Setzen der Variablen

## CMS verwenden

1. **CMS öffnen:**
   - https://weib-coding.vercel.app/admin/

2. **Mit GitHub anmelden:**
   - Klicke auf "Login with GitHub"
   - Autorisiere die App

3. **Properties verwalten:**
   - Erstelle, bearbeite und lösche Properties
   - Änderungen werden automatisch zu GitHub gepusht
   - Vercel deployt automatisch neue Versionen

## Lokale Entwicklung

```bash
# CMS lokal starten
npm run cms

# Dann öffnen: http://localhost:8081/admin/
```

## Troubleshooting

- **"Invalid OAuth App":** Prüfe Client ID/Secret in Vercel
- **"Repository not found":** Prüfe Repository-Name in config.yml
- **"Permission denied":** GitHub App muss Repository-Zugriff haben
