import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios';
import { loadFonts } from './plugins/webfontloader'

const app = createApp(App)
//app.use(router).use(vuetify).mount('#app')
app.use(router).mount('#app')
app.config.globalProperties.axios = axios;
axios.defaults.baseURL = "http://localhost:8081";

loadFonts()
/*
createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
*/