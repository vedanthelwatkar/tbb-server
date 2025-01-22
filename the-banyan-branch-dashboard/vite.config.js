import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/dashboard/",
  server: {
    port: 3000,
    host: true,
    allowedHosts: [
      "thebanyanbranch.com",
      "www.thebanyanbranch.com",
      "52.66.111.49",
    ],
  },
  plugins: [react()],
});
