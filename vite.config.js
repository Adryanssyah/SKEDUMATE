import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
     plugins: [
          vue(),
          vueJsx(),
          VitePWA({
               manifest: {
                    name: 'Skedumate',
                    short_name: 'Skedumate',
                    description: 'Kolaborasi untuk kelola jadwal',
                    theme_color: '#1c1c1c',
                    icons: [
                         {
                              src: '/logo.webp',
                              sizes: '512x512',
                              type: 'image/webp',
                              purpose: 'any maskable',
                         },
                    ],
               },
               workbox: {
                    runtimeCaching: [
                         {
                              urlPattern: /^https:\/\/skedumate-server\.vercel\.app\//,
                              handler: 'CacheFirst',
                              options: {
                                   cacheName: 'skedumate-cache',
                                   cacheableResponse: {
                                        statuses: [0, 200],
                                   },
                              },
                         },
                    ],
               },
          }),
     ],
     resolve: {
          alias: {
               '@': fileURLToPath(new URL('./src', import.meta.url)),
          },
     },
});
