<script setup lang="ts">
const props = defineProps({to: {type: String, required: true}, text: String})
</script>

<template>
  <u-button variant="ghost" color="neutral" class="text-lg hover:text-primary">
    <RouterLink :to="props.to">{{ props.text }}</RouterLink>
  </u-button>
</template>

<style scoped>

</style>