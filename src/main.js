import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import  router  from "@/routes/index.js"
import App from './App.vue';



import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App); // Create the Vue app instance
const pinia = createPinia();

app
  .use(pinia) // Use Pinia
  .use(router) // Use Vue Router
  .mount('#app');