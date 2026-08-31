import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: { sourcemap: true },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'jetbrains-font-stability',
          Declaration(declaration: { prop: string; value: string }) {
            if (declaration.prop === 'font-display' && declaration.value === 'swap') {
              declaration.value = 'optional';
            }
          }
        }
      ]
    }
  },
  resolve: {
    alias: {
      '@formatjs/intl-segmenter/polyfill': resolve('src/lib/empty.ts')
    }
  },
  plugins: [sveltekit()]
});
