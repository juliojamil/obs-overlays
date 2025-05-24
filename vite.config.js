"use strict";

import { defineConfig } from "vite";
import { dirname,resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const settings= {
    base: "./",
    root: "./src",
    build:{
        manifest: false,
        outDir: "../dist",
        minify: "terser",
        target: "esnext",
        terserOptions: {
            mangle: false
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
            "@styles": resolve(__dirname, "src", "styles"),
            "@components": resolve(__dirname, "src", "components")
        }
    },
    server: {
        cors: false,
        open: false
    },
    plugins: []
};

export default defineConfig(settings);