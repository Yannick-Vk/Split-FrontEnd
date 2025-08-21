import {defineStore} from "pinia"
import {mande} from "mande"
import type {UserWithToken, UserLogin} from "../types.ts";

const api = mande(`${import.meta.env.VITE_API_URL}auth/login`)

interface State {
    user: UserWithToken | null,
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
                const jwt: string = await api.post(user);
                this.user = {username: user.username, jwt}
                console.log(`Pinia> Login Success`, this.user.username, this.user.jwt);
                localStorage.setItem('user', JSON.stringify(this.user));

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
    if (!user) {
        return null
    }
    return JSON.parse(user);
}