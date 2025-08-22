<script setup lang="ts">
import type {Split, User} from "../../types.ts";
import {ref} from "vue";
import {useAuthStore} from "../../stores/AuthStore.ts";
import {useSplitStore} from "../../stores/SplitStore.ts";
import {storeToRefs} from "pinia";
import {h, resolveComponent} from 'vue'
import type {TableColumn, TableRow} from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')
const UIcon = resolveComponent('UIcon')

const authStore = useAuthStore();
const userWithToken = storeToRefs(authStore);
const user: User = {email: userWithToken.user.value?.Email ?? "", username: userWithToken.user.value?.UserName ?? ""}

const splitStore = useSplitStore();

const items = storeToRefs(splitStore);
async function add(split: Split) {
  items.splits.value.push(split)
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
    footer: ({column}) => {
      const total_owed = column
          .getFacetedRowModel()
          .rows.filter((row) => (row.getValue('payer') as User).username !== user.username).reduce(
              (acc: number, row: TableRow<Split>) => acc + Number.parseFloat(row.getValue('amount')),
              0
          );
      const total_to_pay = column
          .getFacetedRowModel()
          .rows.filter((row) => (row.getValue('payer') as User).username === user.username).reduce(
              (acc: number, row: TableRow<Split>) => acc + Number.parseFloat(row.getValue('amount')),
              0
          );

      const formatted = (amount: number) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return h('div', {class: 'flex flex-col font-medium text-right'}, [
        h('span', `Total owed: ${formatted(total_owed)}`),
        h('span', `Total left to pay: ${formatted(total_to_pay)}`)
      ])
    },
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

splitStore.getSplits(user.username)
</script>

<template>
  <UContainer class="mt-5">
    <UCard variant="subtle">
      <template #header>
        <h2 class="text-2xl text-center">Split Transactions</h2>
      </template>

      <UTable v-model:sorting="sorting" :data="items.splits.value" :columns class="flex-1"/>
    </UCard>
    <SplitForm @add="add" :user="user"/>
  </UContainer>
</template>

<style scoped>

</style>