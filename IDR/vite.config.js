import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-motion": ["motion"],
          "vendor-router": ["react-router-dom"],
          "vendor-ui": ["lucide-react", "react-hot-toast"],
          "vendor-scroll": ["locomotive-scroll", "lenis"],
        },
      },
    },
    // Remove console.log in production
    minify: "esbuild",
    esbuildOptions: {
      drop: ["console", "debugger"],
    },
  },
});
