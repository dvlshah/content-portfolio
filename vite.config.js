import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Import visualizer conditionally
let visualizer;
try {
  visualizer = (await import('rollup-plugin-visualizer')).visualizer;
} catch (e) {
  console.warn('Visualizer plugin not available in production');
}

export default defineConfig({
  plugins: [
    react(),
    visualizer && visualizer({
      open: true,
      gzipSize: true,
    }),
  ].filter(Boolean),
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            '@chakra-ui/react',
            '@emotion/react',
            '@emotion/styled',
          ],
          'components': [
            './src/components/BlogCard',
            './src/components/HeroSection',
            './src/components/FeaturedArticleSection',
          ],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@chakra-ui/react'],
  },
  server: {
    port: 3000,
    open: true,
    host: 'localhost',
  },
});