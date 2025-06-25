import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
export default defineConfig({
  plugins: [vue(),
     AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
     Components({
      resolvers: [ElementPlusResolver()],
    }),
    tailwindcss(),
    visualizer({ open: true })
  ],
  esbuild: {
    drop: ['console', 'debugger']
  }
})


