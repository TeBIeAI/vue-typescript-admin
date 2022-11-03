import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  console.log(env)
  const viteEnv = wrapperEnv(env)
  const { VITE_PUBLIC_PATH, VITE_PORT } = viteEnv
  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        cps: resolve(__dirname, 'src/components')
      },
      extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    plugins: createVitePlugins(),
    server: {
      host: true,
      port: VITE_PORT
    }
    /* more config */
  }
})
