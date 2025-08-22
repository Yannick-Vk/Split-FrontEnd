<script setup lang="ts">
import type {Split, User} from "../../types.ts";
import {computed} from "vue";

const props = defineProps<{ item: Split, user: User }>();

const isPayer = computed(() => props.user.username === props.item.payer.username);
</script>

<template>
  <UAlert
      :color="isPayer ? 'error' : 'success'"
      variant="subtle"
      :description="isPayer? `You owe ${props.item.receiver.username} ${props.item.amount}` : `${props.item.payer.username} owes you ${props.item.amount}`"
      :icon="isPayer? 'lucide:arrow-up-from-line' : 'lucide:arrow-down-from-line'"
      class="mb-2"
  />
</template>

<style scoped>

</style>