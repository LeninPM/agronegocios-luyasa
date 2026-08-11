// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Necesario para que las URLs absolutas (og:image, canonical, sitemap.xml)
  // apunten al dominio real y no a localhost.
  // Dominio propio (registrado en Punto.pe, apuntado a Netlify).
  site: 'https://agronegociosluyasa.pe',

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
