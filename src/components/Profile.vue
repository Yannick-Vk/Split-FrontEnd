<script setup lang="ts">
import {ref} from 'vue'
import {useAuthStore} from "../stores/AuthStore.ts";
import {storeToRefs} from "pinia";

const authStore = useAuthStore();
const {user} = storeToRefs(authStore);

import type {DropdownMenuItem} from '@nuxt/ui'

const toast = useToast();

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: user?.value?.username,
      icon: 'i-lucide-user',
      type: 'label'
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onSelect(_: Event) {
        logout();
      }
    }
  ]
])


const logout = () => {
  toast.add({title: 'Logout success', description: 'Logged out', color: 'success'})
  authStore.logout()
}
</script>

<template>
  <UDropdownMenu
      v-if="user"
      :items="items"
      :ui="{
      content: 'w-48'
    }"
  >
    <UButton v-if="user?.username" icon="lucide:user-round" color="neutral" variant="outline">
      {{ user.username }}
    </UButton>
  </UDropdownMenu>
</template>

<style scoped>

</style>