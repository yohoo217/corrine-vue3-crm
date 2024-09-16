//src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import axios from 'axios'

// PrimeVue styles
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'


// 設置 Axios 的基礎 URL
axios.defaults.baseURL = 'http://localhost:5001/api'

const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
    console.error('Vue error:', err)
    console.log('Error info:', info)
  }
  

app.use(router)
app.use(store)
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')

store.subscribe((mutation, state) => {
    console.log('Mutation:', mutation.type, mutation.payload);
    console.log('State after mutation:', JSON.stringify(state));
  });
  
  app.use(store)
     .use(router)
     .use(PrimeVue)
     .use(PrimeVue, { ripple: true })
    
  app.use(PrimeVue, {
      ripple: true,
      inputStyle: 'outlined'
    })