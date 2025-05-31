"use strict";

import { defineConfig } from "vite";
import { dirname,resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const settings= {
    base: "./",
    root: "./pages",
    build:{
        manifest: false,
        outDir: "../dist",
        minify: false,
        //minify: "terser",
        target: "es2020",
        terserOptions: {
            mangle: false
        },
        rollupOptions: {
            input: {
                main: resolve(__dirname, "pages", "index.html"),
                "digital-clock": resolve(__dirname, "pages", "digital-clock", "index.html")
            }
        }
    },
    optimizeDeps: {
        keepNames: true
    },
    css: {
        postcss: {
            config: "./postcss.config.js"
        }
    },
    publicDir: "../static",
    resolve: {
        alias: {
            "@styles": resolve(__dirname, "design"),
            "@simplybuilder": resolve(__dirname, "simplybuilder"),
        }
    },
    server: {
        cors: false,
        open: false,
        port: 3000
    },
    plugins: []
};

export default defineConfig(settings);