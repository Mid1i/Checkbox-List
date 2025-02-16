import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": "/src/",
      "@/assets": "/src/assets",
      "@/components": "/src/components",
      "@/types": "/src/types"
    }
  },
  server: {
    host: true,
    port: 5173
  }
})
