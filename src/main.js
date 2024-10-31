//src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import axios from 'axios'
import i18n from './i18n' // 引入 i18n


// PrimeVue styles
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// 設置 Axios 的基礎 URL
axios.defaults.baseURL = 'http://localhost:5001/api'

const app = createApp(App)

// 配置 Vue 的全局錯誤處理器
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err)
  console.log('Error info:', info)
}

// 使用 Vue 插件和服務
app.use(router)
app.use(store)
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)
app.use(i18n) // 使用 i18n

app.mount('#app')
