import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// add the beginning of your app entry

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { global: "globalThis" },
});
