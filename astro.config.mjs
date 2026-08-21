// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Project page: https://<org>.github.io/obcommons
export default defineConfig({
  site: 'https://omnibenchmark.github.io',
  base: '/obcommons',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
