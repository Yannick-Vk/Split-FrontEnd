import {defineStore} from "pinia"
import {mande} from "mande"
import type {Split} from "../types.ts";

const api = mande(`${import.meta.env.VITE_API_URL}split`)

interface State {
    splits: Split[]
}

export const useSplitStore = defineStore('split', {
    state: (): State => {
        return {
            splits: []
        }
    },
    actions: {
        async getSplits(username: string) {
            this.splits = await getItems(username);
        }
    }
})

async function getItems(username: string) {
    const str = await api.get<Split[]>('/name/' + username)
    console.table(str)
    return str;
}