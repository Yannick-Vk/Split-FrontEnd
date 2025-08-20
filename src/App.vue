<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <UApp>
    <nav-bar/>
    <main>
      <RouterView />
    </main>
  </UApp>
</template>

<style scoped>
main {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
