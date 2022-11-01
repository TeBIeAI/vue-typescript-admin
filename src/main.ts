import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)

app.use(router).use(store).mount('#app')
