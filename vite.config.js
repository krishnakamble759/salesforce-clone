import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    // Base public path
    base: '/salesforce-clone4/',

    // Server configuration
    server: {
        port: 5173,
        open: true,
        host: true,
    },

    // Build configuration
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'terser',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'html/index.html'),
                agentforce: resolve(__dirname, 'html/agentforce.html'),
            },
            output: {
                assetFileNames: 'assets/[name]-[hash][extname]',
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
            },
        },
    },

    // CSS configuration
    css: {
        preprocessorOptions: {
            scss: {
                // Variables are imported directly in style.scss using @use
            },
        },
    },

    // Resolve configuration
    resolve: {
        alias: {
            '@': resolve(__dirname, './'),
            '@css': resolve(__dirname, './css'),
            '@js': resolve(__dirname, './js'),
            '@assets': resolve(__dirname, './assets'),
        },
    },

    // Optimizations
    optimizeDeps: {
        include: [],
    },
});
