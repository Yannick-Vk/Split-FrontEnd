<script setup lang="ts">
import {ref} from 'vue'

const user = ref('USERNAME')
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
          <UBadge variant="subtle" color="neutral">
            {{ user }}
            <UAvatar icon="lucide:user-round" size="lg" class="ml-1"/>
          </UBadge>
        </div>
      </div>
    </UCard>
  </nav>
</template>

<style scoped>

</style>