import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
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
