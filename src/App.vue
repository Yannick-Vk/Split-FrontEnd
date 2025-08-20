<script setup lang="ts">
import LoginForm from "./components/LoginForm.vue";
</script>

<template>
  <UApp>
    <main>
      <RouterView />
      <login-form/>
    </main>
  </UApp>
</template>

<style scoped>
main {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
