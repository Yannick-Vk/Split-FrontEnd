<script setup lang="ts">
import type {Split, User} from "../../types.ts";
import {computed, ref} from "vue";
import type {Ref} from "vue";
import SplitItem from "./SplitItem.vue";
import {useAuthStore} from "../../stores/AuthStore.ts";
import {storeToRefs} from "pinia";

const authStore = useAuthStore();
const userWithToken = storeToRefs(authStore);
const user: User = {email: userWithToken.user.value?.Email?? "", username: userWithToken.user.value?.UserName ?? ""}

const items: Ref<Split[]> = ref([
  { payer: {email: "", username: "Jeff"}, receiver: user, amount: 10.15},
  { payer: user, receiver: {email: "Jeff@jeffke.com", username: "Jeff"}, amount:  5.00},
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
      <template #footer>
        <div class="flex flex-col">
          <span>Total owed: {{ total_owed }}</span>
          <span>Total to pay: {{total_to_pay}}</span>
        </div>
      </template>
    </UCard>
    <SplitForm @add="add" :user="user" />
  </UContainer>
</template>

<style scoped>

</style>