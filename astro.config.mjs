// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Necesario para que las URLs absolutas (og:image, canonical, sitemap.xml)
  // apunten al dominio real y no a localhost.
  // 👉 Al comprar el dominio propio, cambiar SOLO esta línea.
  site: 'https://agronegocios-luyasa.netlify.app',

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
