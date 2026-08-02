import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // ← यह ज़रूरी है

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),   // ← नया
      "@tools": path.resolve(__dirname, "./src/tools"),   // ← नया
      // अगर और भी हैं (जैसे @utils, @components) तो यहाँ डालें
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
