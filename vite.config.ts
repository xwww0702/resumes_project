import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 控制入口文件命名
        entryFileNames: "assets/index.[hash].js",
        // 控制静态资源如图片、CSS、字体的命名
        assetFileNames: "assets/[name].[hash][extname]",
        // 控制 chunk 文件（代码分割的文件）命名
        chunkFileNames: "assets/[name].[hash].js",
        //分包
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    tailwindcss(),
    visualizer({ open: true }),
  ],
  esbuild: {
    drop: ["console", "debugger"],
  },
});
