import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createHead } from '@unhead/vue/client'
import './styles/main.css'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.mount('#app')
