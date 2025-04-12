import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { default: istanbul } = await import('vite-plugin-istanbul');

  return {                              // / uri par defaut en local
    base: process.env.VITE_BASE || '/', // 👈 dynamique avec process.env.VITE_BASE : ex: '/realisations/cicd-docker/' pour uri du site sur serveur distant
    plugins: [
      istanbul({
        include: 'src/*',
        exclude: ['node_modules', 'test/'],
        extension: ['.js', '.ts', '.vue'],
        forceBuildInstrument: true
      }),
      vue()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': 'http://localhost:3000'
      }
    },
    build: {
      sourcemap: true
    }
  };
});