import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import React from "@vitejs/plugin-react-swc";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  base: "./",
  plugins: [UnoCSS(), React(), nodePolyfills(),],
});
