import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://hunormarton.github.io",
  base: "svg-curves",
  integrations: [react()],
});
