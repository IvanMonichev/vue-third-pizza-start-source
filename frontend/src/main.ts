import router from '@/router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app.vue'
import '@/assets/sass/style.scss'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
