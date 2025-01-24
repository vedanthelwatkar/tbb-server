import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    hmr: {
      host: "thebanyanbranch.com",
      protocol: "wss",
    },
  },
  preview: {
    host: true,
    port: 5173,
  },
  css: {
    transformer: "postcss",
  },
});
