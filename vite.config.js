    // vite.config.js
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react-swc';

    export default defineConfig({
      base: '/elevator-sim/', // Or '/' for user/org pages
      plugins: [react()],
      build: {
        outDir: 'dist', // Default, but good to be explicit
      },
    });
