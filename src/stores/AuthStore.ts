import {defineStore} from "pinia"
import { mande } from "mande"
import type {User, UserLogin} from "../types.ts";

const api = mande("http://localhost:5079/api/v1/auth/login")

interface State {
    user: User | null,
}

export const useAuthStore = defineStore('auth', {
    state: (): State => {
        return {
            user: null as User | null,
        }
    },
    actions: {
        async LoginUser(user: UserLogin) {
            try {
                this.user = await api.post<User>(user)
                console.log(`Pinia> Login Success`, user)

            } catch (err: any) {
                console.error(err)
            }
        }
    }
})