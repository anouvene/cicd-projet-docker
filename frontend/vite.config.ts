import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { default: istanbul } = await import('vite-plugin-istanbul');

  return {
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