<script setup lang="ts">
import type {Split, User} from "../../types.ts";
import {computed, ref} from "vue";
import type {Ref} from "vue";
import {useAuthStore} from "../../stores/AuthStore.ts";
import {storeToRefs} from "pinia";
import {h, resolveComponent} from 'vue'
import type {TableColumn} from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')
const UIcon = resolveComponent('UIcon')

const authStore = useAuthStore();
const userWithToken = storeToRefs(authStore);
const user: User = {email: userWithToken.user.value?.Email ?? "", username: userWithToken.user.value?.UserName ?? ""}

const items: Ref<Split[]> = ref([
  {payer: {email: "", username: "Jeff"}, receiver: user, amount: 10.15},
  {payer: user, receiver: {email: "Jeff@jeffke.com", username: "Jeff"}, amount: 5.00},
]);

const total_owed = computed(() =>
    items.value.filter((item) => item.payer.username !== user.username).reduce((acc, item) => acc + item.amount, 0)
);

const total_to_pay = computed(() =>
    items.value.filter((item) => item.payer.username === user.username).reduce((acc, item) => acc + item.amount, 0)
);

async function add(split: Split) {
  items.value.push(split)
}


const columns: TableColumn<Split>[] = [
  {
    accessorKey: 'payer',
    header: 'payer',
    cell: ({row}) => `${(row.getValue('payer') as User).username}`,
  },
  {
    accessorKey: 'receiver',
    header: 'receiver',
    cell: ({row}) => `${(row.getValue('receiver') as User).username}`,
  },
  {
    accessorKey: 'status',
    header: 'status',
    cell: ({row}) => {
      const isPayer = (row.getValue('payer') as User).username === user.username;
      const color = isPayer ? "error" : "success";

      return h(UBadge, {class: 'capitalize text-right font-medium', variant: 'subtle', color}, () =>
          h(UIcon, {name: isPayer ? 'lucide:arrow-up-from-line' : 'lucide:arrow-down-from-line', class: "size-5"})
      )
    }
  },
  {
    accessorKey: 'amount',
    header: 'amount',
    cell: ({row}) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return h('div', {class: 'text-right font-medium'}, formatted)
    },
  },
]

const sorting = ref([
  {
    id: 'payer',
    desc: false
  }
])
</script>

<template>
  <UContainer class="mt-5">
    <UCard variant="subtle">
      <template #header>
        <h2 class="text-2xl text-center">Split Transactions</h2>
      </template>

      <UTable v-model:sorting="sorting" :data="items" :columns class="flex-1"/>

      <template #footer>
        <div class="flex flex-col">
          <span>Total owed: {{ total_owed }}</span>
          <span>Total to pay: {{ total_to_pay }}</span>
        </div>
      </template>
    </UCard>
    <SplitForm @add="add" :user="user"/>
  </UContainer>
</template>

<style scoped>

</style>