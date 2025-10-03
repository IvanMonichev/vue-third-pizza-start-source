import router from '@/router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app.vue'
import '@/assets/sass/style.scss'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

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

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
