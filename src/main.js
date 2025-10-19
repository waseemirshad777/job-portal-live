import './assets/main.css'
import './assets/tailwind.css'
import { Icon } from '@iconify/vue';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/config/baseurl';
import App from './App.vue'
import router from './router'

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

// import 'flowbite';
// import 'flowbite/dist/flowbite.min.css';

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css'; 


const app = createApp(App)
// app.component('Icon', Icon);
app.use(createPinia())
app.use(VueAwesomePaginate)
app.use(VueToast);
app.use(router)

app.mount('#app')
