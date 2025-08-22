<script setup lang="ts">
import NavBar from "./components/nav/NavBar.vue";
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
</style>
