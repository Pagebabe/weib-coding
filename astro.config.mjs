import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://weib-coding.vercel.app',
  build: {
    assets: 'assets'
  }
});