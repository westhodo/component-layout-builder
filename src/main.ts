import '@/assets/scss/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import { ThemePreset } from '@/style'
import { Icon } from '@iconify/vue'

const app = createApp(App)

app.component('AppIcon', Icon)

app.use(PrimeVue, {
  theme: {
    preset: ThemePreset,
    options: {
      darkModeSelector: '.app-theme-dark'
    }
  }
})
app.use(createPinia())
app.use(router)
app.mount('#app')
