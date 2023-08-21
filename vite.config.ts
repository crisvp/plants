import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import mdPlugin from 'vite-plugin-md';

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    mdPlugin(),
  ],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
});
