import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          semester1: path.resolve(__dirname, 'semester-1.html'),
          semester2: path.resolve(__dirname, 'semester-2.html'),
          cprogramming: path.resolve(__dirname, 'c-programming-notes.html'),
          datastructures: path.resolve(__dirname, 'data-structures-basics.html'),
          cheatsheets: path.resolve(__dirname, 'cheat-sheets.html'),
          quiz: path.resolve(__dirname, 'quiz.html'),
          chemistrytopper: path.resolve(__dirname, 'chemistry-topper-notes.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
