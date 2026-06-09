import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));
const inputMap = htmlFiles.reduce((acc, file) => {
  const name = file.replace('.html', '').replace(/[^a-zA-Z0-9_]/g, '_');
  acc[name] = path.resolve(__dirname, file);
  return acc;
}, {} as Record<string, string>);

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [tailwindcss(), react()],
    build: {
      rollupOptions: {
        input: inputMap,
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Extract large known modules
              if (id.includes('@google/genai')) return 'genai';
              if (id.includes('@supabase')) return 'supabase';
              if (id.includes('framer-motion') || id.includes('motion')) return 'motion';
              if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
              return 'vendor'; // Default vendor chunk
            }
          }
        }
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
