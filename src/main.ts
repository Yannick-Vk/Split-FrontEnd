import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import { createPinia } from 'pinia'
import ui from '@nuxt/ui/vue-plugin'
import './assets/main.css'
import App from './App.vue'
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import Split from "./components/Split.vue";

const app = createApp(App);
const pinia = createPinia();

const router = createRouter({
    linkActiveClass: 'text-primary',
    routes: [
        {path: '/', component: Split},
        {path: '/login', component: LoginForm},
        {path: '/register', component: RegisterForm},
    ],
    history: createWebHistory()
})
app.use(router)
app.use(pinia)
app.use(ui)

app.mount('#app')
