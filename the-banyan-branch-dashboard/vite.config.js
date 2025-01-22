import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      "thebanyanbranch.com",
      "www.thebanyanbranch.com",
      "52.66.111.49",
    ],
  },
});
