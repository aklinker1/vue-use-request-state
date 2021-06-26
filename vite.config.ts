import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import typescript from 'rollup-plugin-typescript2';
// @ts-expect-error: node types are not installed
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), typescript()],
  build: {
    lib: {
      // @ts-expect-error: node types are not installed
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'VueUseRequestState',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
  },
});
