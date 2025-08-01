import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VITE_UNIFIED_AUTH_URL || 'https://api.pulasa.com',
        changeOrigin: true,
        secure: true,
      },
      '/auction-api': {
        target: process.env.VITE_AUCTION_API_URL || 'https://auction-api.pulasa.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/auction-api/, '/api')
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
