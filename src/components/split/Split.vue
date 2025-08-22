<script setup lang="ts">
import type {Split, User} from "../../types.ts";
import {ref} from "vue";
import type {Ref} from "vue";
import SplitItem from "./SplitItem.vue";

const user = ref<User>({username: "Yanick", email: "Yannick@gmail.com"})
const items: Ref<Split[]> = ref([
  { payer: {email: "", username: "Jeff"}, receiver: user.value, amount: 10.15},
  { payer: user.value, receiver: {email: "Jeff@jeffke.com", username: "Jeff"}, amount:  5.00},
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
      <template v-for="item in items">
        <split-item :item="item" :user="user" />
      </template>
    </UCard>
    <SplitForm @add="add" />
  </UContainer>
</template>

<style scoped>

</style>