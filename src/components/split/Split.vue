<script setup lang="ts">
import type {Split, User} from "../../types.ts";
import {ref} from "vue";
import type {Ref} from "vue";

const user = ref<User>({username: "Yanick", email: "Yannick@gmail.com"})
const items: Ref<Split[]> = ref([
  { payer: {email: "", username: "Jeff"}, user: user.value, amount: 10.15},
  { payer: {email: "", username: "Jake"}, user: user.value, amount:  5.00},
]);

async function add(split: Split) {
  items.value.push(split)
}
</script>

<template>
  <UContainer class="mt-5">
    <UCard variant="subtle">
      <template #header>
        <h2 class="text-2xl text-center">Split Transactions</h2>
      </template>
      <div v-for="item in items">
        <UAlert
            color="neutral"
            variant="subtle"
            :description="`${item.payer.username} owes you ${item.amount}`"
            icon="lucide:arrow-up-from-line"
            class="mb-2"
        />
      </div>
    </UCard>
    <SplitForm @add="add" />
  </UContainer>
</template>

<style scoped>

</style>