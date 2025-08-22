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
      avatar: {
        src: 'https://github.com/benjamincanac.png'
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [',']
    },
    {
      label: 'Keyboard shortcuts',
      icon: 'i-lucide-monitor'
    }
  ],
  [
    {
      label: 'Team',
      icon: 'i-lucide-users'
    },
    {
      label: 'Invite users',
      icon: 'i-lucide-user-plus',
      children: [
        [
          {
            label: 'Email',
            icon: 'i-lucide-mail'
          },
          {
            label: 'Message',
            icon: 'i-lucide-message-square'
          }
        ],
        [
          {
            label: 'More',
            icon: 'i-lucide-circle-plus'
          }
        ]
      ]
    },
    {
      label: 'New team',
      icon: 'i-lucide-plus',
      kbds: ['meta', 'n']
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Support',
      icon: 'i-lucide-life-buoy',
      to: '/components/dropdown-menu'
    },
    {
      label: 'API',
      icon: 'i-lucide-cloud',
      disabled: true
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['shift', 'meta', 'q'],
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