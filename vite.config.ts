import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  console.log(env)
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        cps: resolve(__dirname, 'src/components')
      },
      extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      viteMockServe()
    ]
    /* more config */
  }
})
