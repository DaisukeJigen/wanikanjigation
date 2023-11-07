// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
// import '@/assets/main.css'
// import 'primevue/resources/themes/lara-light-teal/theme.css';
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';    
import '@/assets/scss/main.scss';

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.use(PrimeVue);

app.mount('#app')
