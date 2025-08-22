<script setup lang="ts">
import {ref} from "vue";

defineProps({label: String, name: String, placeholder: String})
const model = defineModel<string>()

const showPassword = ref(false)

</script>

<template>
  <UFormField :label="label" :name="name">
    <UButtonGroup>
      <UInput v-model="model" :placeholder="placeholder"
              :type="showPassword ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }">
      </UInput>
      <UButton
          color="primary"
          variant="subtle"
          size="sm"
          :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          :aria-pressed="showPassword"
          aria-controls="password"
          @click="showPassword = !showPassword"
      />
    </UButtonGroup>
  </UFormField>
</template>

<style scoped>

</style>