import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: 'localhost',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            '@tanstack/react-query'  
          ],
          'ui': [
            '@chakra-ui/react',
            '@chakra-ui/icons',
            '@emotion/react',
            '@emotion/styled'
          ],
          'animations': [
            'framer-motion'
          ],
          'icons': [
            'lucide-react',
            'react-icons/fa',
            'react-icons/hi'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
    minify: 'esbuild',
    target: 'esnext'
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@chakra-ui/react',
      '@tanstack/react-query',
      'framer-motion'
    ],
    exclude: ['@tanstack/react-query-devtools']
  }
});
