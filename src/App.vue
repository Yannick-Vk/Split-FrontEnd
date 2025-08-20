<script setup lang="ts">
import {} from "./components/RegisterForm.vue";
</script>

<template>
  <UApp>
    <main>
      <RouterView />
      <register-form/>
    </main>
  </UApp>
</template>

<style scoped>
main {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
