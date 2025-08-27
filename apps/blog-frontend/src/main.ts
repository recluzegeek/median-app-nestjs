import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// PrimeVue imports
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'

// Import global styles
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  ripple: true,
  inputStyle: 'outlined',
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
