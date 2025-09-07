import { defineConfig } from 'astro/config';
import i18n from 'astro-i18n';

export default defineConfig({
  integrations: [i18n({
    locales: ['de','en','th'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: true },
  })],
  site: 'https://example.com',
});