import { defineConfig } from 'astro/config';
import i18n from 'astro-i18n';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    react(),
    i18n({
      locales: ['de','en','th'],
      defaultLocale: 'de',
      routing: { prefixDefaultLocale: true },
    })
  ],
  site: 'https://example.com',
});