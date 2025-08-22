<script setup lang="ts">
import {computed} from 'vue'
import {useAuthStore} from "../stores/AuthStore.ts";
import {storeToRefs} from "pinia";

const authStore = useAuthStore();
const {user} = storeToRefs(authStore);

import type {DropdownMenuItem} from '@nuxt/ui'

const toast = useToast();

const items = computed(() => [{
  label: user?.value?.Email,
  icon: 'i-lucide-at-sign',
  type: 'label'
},
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    onSelect(_: Event) {
      logout();
    }
  },
] satisfies DropdownMenuItem[])


const logout = () => {
  toast.add({title: 'Logout success', description: 'Logged out', color: 'success'})
  authStore.Logout()
}
</script>

<template>
  <UDropdownMenu
      v-if="user"
      :items="items"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8
      }"
      :ui="{
      content: 'w-48'
    }"
  >
    <UButton icon="lucide:user-round" color="neutral" variant="outline">
      {{ user.UserName }}
    </UButton>
  </UDropdownMenu>
</template>

<style scoped>

</style>