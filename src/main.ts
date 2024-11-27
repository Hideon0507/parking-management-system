import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import router from "./router/router"

// createApp(App).mount('#app')

const app = createApp(App)
const vuetify = createVuetify()
app.use(vuetify)
app.use(router)
app.mount('#app')