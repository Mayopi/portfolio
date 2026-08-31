import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: { sourcemap: true },
  resolve: {
    alias: {
      '@formatjs/intl-segmenter/polyfill': resolve('src/lib/empty.ts')
    }
  },
  plugins: [sveltekit()]
});
