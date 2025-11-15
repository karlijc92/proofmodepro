import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSourceLocator } from "@metagptx/vite-plugin-source-locator";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: "mgx",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Tell Vite/Rollup to ignore @memberstack/react completely
  optimizeDeps: {
    exclude: ["@memberstack/react"],
  },
  build: {
    rollupOptions: {
      external: ["@memberstack/react"],
    },
  },
}));
