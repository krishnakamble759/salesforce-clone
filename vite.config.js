import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    // Base public path
    base: '/salesforce-clone/',

    // Server configuration
    server: {
        port: 5173,
        open: true,
        host: true,
    },

    root: 'html',
    publicDir: '../public',
    // Build configuration
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            input: Object.fromEntries(
                fs.readdirSync(resolve(__dirname, 'html'))
                    .filter(file => file.endsWith('.html'))
                    .map(file => [
                        file === 'index.html' ? 'main' : file.replace(/\.html$/, ''),
                        resolve(__dirname, 'html', file)
                    ])
            ),
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
