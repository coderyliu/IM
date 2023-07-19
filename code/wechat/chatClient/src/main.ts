import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'

// 按需引入组件
import { autoImportCpn } from './utils'

// 样式重置
import 'normalize.css'
import '@/assets/less/index.less'

const app = createApp(App)
app.use(pinia)
app.use(router)
autoImportCpn(app)

app.mount('#app')
