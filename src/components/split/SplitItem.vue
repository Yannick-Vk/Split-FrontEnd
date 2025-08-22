<script setup lang="ts">
import type {Split} from "../../types.ts";

defineProps<{item: Split}>();

</script>

<template>
  <UAlert
      color="neutral"
      variant="subtle"
      :description="`${item.payer.username} owes you ${item.amount}`"
      icon="lucide:arrow-up-from-line"
      class="mb-2"
  />
</template>

<style scoped>

</style>