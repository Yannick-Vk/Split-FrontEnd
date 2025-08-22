import {defineStore} from "pinia"
import {mande} from "mande"
import type {UserWithToken, UserLogin, UserRegister} from "../types.ts";

const api = mande(`${import.meta.env.VITE_API_URL}auth`)

interface State {
    user: UserWithToken | null,
}

export const useAuthStore = defineStore('auth/', {
    state: (): State => {
        return {
            user: getLocal()
        }
    },
    actions: {
        async LoginUser(user: UserLogin) {
            try {
                const userWithToken: string = await api.post('login', user);
                this.user = JSON.parse(userWithToken);
                console.log(`Pinia> Login Success ${this.user?.UserName}`);
                localStorage.setItem('user', JSON.stringify(this.user));

            } catch (err: any) {
                console.error(err)
            }
        },
        Logout() {
            this.user = null;
            localStorage.removeItem('user');
        },
        async RegisterUser(user: UserRegister) {
            try {
                const userWithToken: string = await api.post('register', user);
                console.table(userWithToken);
                this.user = JSON.parse(userWithToken);
                console.log(`Pinia> Registration Success ${this.user?.UserName}`);
                localStorage.setItem('user', JSON.stringify(this.user));
            } catch (err) {
                console.error(err);
            }
        }
    }
})

const getLocal = () => {
    const user = localStorage.getItem('user');
    if (!user) {
        return null
    }
    return JSON.parse(user);
}