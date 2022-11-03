import { createApp } from 'vue'
import router, { setupRouter } from './router'
import { setupStore } from './store'
import App from './App.vue'
import 'element-plus/theme-chalk/el-message.css'

async function bootstrap() {
  const app = createApp(App)

  // 挂载状态组件
  setupStore(app)

  // 挂在路由
  await setupRouter(app)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  app.mount('#app', true)
}

bootstrap()
