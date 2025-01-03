import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import React from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [UnoCSS(), React()],
});
