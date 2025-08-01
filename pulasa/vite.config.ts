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
        target: 'https://pulasa-auth-service.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/auction-api': {
        target: 'https://pulasa-auction-server.onrender.com',
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
