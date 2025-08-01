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
        target: process.env.VITE_UNIFIED_AUTH_URL || 'http://localhost:6001',
        changeOrigin: true,
        secure: true,
      },
      '/auction-api': {
        target: process.env.VITE_AUCTION_API_URL || 'http://localhost:5001',
        changeOrigin: true,
        secure: true,
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
