import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/dashboard/",
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      host: "thebanyanbranch.com",
      protocol: "wss",
    },
  },
  preview: {
    host: true,
    port: 3000,
  },
  css: {
    transformer: "postcss",
  },
});
