import {defineStore} from "pinia"
import { mande } from "mande"
import type {User, UserLogin} from "../types.ts";

const api = mande(`${import.meta.env.VITE_API_URL}auth/login`)

interface State {
    user: User | null,
}

export const useAuthStore = defineStore('auth', {
    state: (): State => {
        return {
            user: getLocal()
        }
    },
    actions: {
        async LoginUser(user: UserLogin) {
            try {
                this.user = await api.post<User>(user)
                console.log(`Pinia> Login Success`, user)
                localStorage.setItem('user', JSON.stringify({username: user.username}));

            } catch (err: any) {
                console.error(err)
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
        },
    }
})

const getLocal = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
}