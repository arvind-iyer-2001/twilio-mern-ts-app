import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@Components": path.resolve(__dirname, "./src/Components"),
      "@Contexts": path.resolve(__dirname, "./src/Contexts"),
      "@Hooks": path.resolve(__dirname, "./src/Hooks"),
      "@Routes": path.resolve(__dirname, "./src/Routes"),
      "@Screens": path.resolve(__dirname, "./src/Screens"),
      "@Types": path.resolve(__dirname, "./src/Types"),
      "@Utils": path.resolve(__dirname, "./src/Utils"),
    },
  },
})
