import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import { createPinia } from 'pinia'
import ui from '@nuxt/ui/vue-plugin'
import './assets/main.css'
import App from './App.vue'
import LoginForm from "./components/authentication/LoginForm.vue";
import RegisterForm from "./components/authentication/RegisterForm.vue";
import SplitForm from "./components/split/SplitForm.vue";
import {useAuthStore} from "./stores/AuthStore.ts";

const app = createApp(App);
const pinia = createPinia();

const router = createRouter({
    linkActiveClass: 'text-primary',
    routes: [
        {path: '/', component: SplitForm},
        {path: '/login', component: LoginForm},
        {path: '/register', component: RegisterForm},
    ],
    history: createWebHistory()
})

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        return '/login';
    }
});


app.use(router)
app.use(pinia)
app.use(ui)

app.mount('#app')
