import router from '@/router'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import 'vue3-toastify/dist/index.css'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

import App from './app.vue'
import '@/assets/sass/style.scss'

const app = createApp(App)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5
    }
  }
})

const options: ToastContainerOptions = {
  autoClose: 3000,
  position: 'top-center',
  pauseOnHover: true,
  closeOnClick: true,
  closeButton: false,
  theme: 'light',
  hideProgressBar: true
}

app.use(Vue3Toastify, options)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
