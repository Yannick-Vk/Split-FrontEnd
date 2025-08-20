<script setup lang="ts">
</script>

<template>
  <UApp>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </nav>
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
