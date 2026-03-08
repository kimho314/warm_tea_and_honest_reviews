import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createUnhead } from '@unhead/vue'
import './styles/main.css'

const app = createApp(App)
const head = createUnhead()

app.use(router)
app.use(head)
app.mount('#app')
