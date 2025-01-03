import {
  defineConfig,
  presetUno,
  presetWind,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup,
  presetWebFonts,
} from "unocss";
import { createLocalFontProcessor } from "@unocss/preset-web-fonts/local";

export default defineConfig({
  content: {
    filesystem: ["**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}"],
  },
  presets: [
    presetUno({ dark: "media" }),
    presetWind(),
    presetAttributify(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Inter",
      },
      processors: createLocalFontProcessor({
        cacheDir: "node_modules/.cache/unocss/fonts",
        fontAssetsDir: "public/assets/fonts",
        fontServeBaseUrl: "/assets/fonts",
      }),
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
