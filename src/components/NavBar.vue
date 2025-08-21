<script setup lang="ts">
</script>

<template>
  <nav>
    <UCard variant="subtle">
      <div class="flex items-center justify-between">
        <div class="flex gap-1">
          <nav-item to="/" text="Home"/>
          <nav-item to="/login" text="Login"/>
          <nav-item to="/register" text="Register"/>
        </div>
        <div>
          <profile/>
        </div>
      </div>
    </UCard>
  </nav>
</template>

<style scoped>

</style>