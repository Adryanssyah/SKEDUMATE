import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './dist/output.css';
import './assets/custom.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import checkSession from './composables/checkSession';
import clickOutside from './directives/detect-outside';
const { load } = checkSession();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL_API;

const app = createApp(App);

app.directive('closable', clickOutside);

app.use(createPinia());

async function startApp() {
     await load();
     app.use(router);
     app.mount('#app');
}

startApp();
