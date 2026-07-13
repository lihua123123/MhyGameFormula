import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    cssCodeSplit: false,
    assetsDir: '',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'script.js',
        assetFileNames: (info) => {
          if (/\.css$/.test(info.name)) return 'style.css';
          return '[name][extname]';
        },
      },
    },
  },
});
