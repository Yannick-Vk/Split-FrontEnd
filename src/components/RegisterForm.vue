<script setup lang="ts">
import {reactive, ref} from "vue";
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'

const schema = z.object({
  email: z.email('Invalid email'),
  username: z.string("Username cannot be empty"),
  password: z.string("Password cannot be empty").min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string("Confirm password cannot be empty").min(8, 'Must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({title: 'Success', description: 'The form has been submitted.', color: 'success'})
  console.log(event.data)
}
</script>

<template>
  <UCard variant="subtle" id="card">
    <template #header>
      <h2 class="text-2xl">Register</h2>
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UButtonGroup>
          <UInput v-model="state.email" placeholder="Email"/>
          <UBadge color="neutral" variant="subtle" icon="lucide:at-sign"/>
        </UButtonGroup>
      </UFormField>

      <UFormField label="Username" name="username">
        <UButtonGroup>
          <UInput v-model="state.username" placeholder="Username"/>
          <UBadge color="neutral" variant="subtle" icon="lucide:circle-user-round"/>
        </UButtonGroup>
      </UFormField>

      <UFormField label="Password" name="password">
        <UButtonGroup>
          <UInput v-model="state.password" placeholder="Password"
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

      <UFormField label="Confirm Password" name="confirmPassword">
        <UButtonGroup>
          <UInput v-model="state.confirmPassword" placeholder="Confirm Password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :ui="{ trailing: 'pe-1' }">
          </UInput>
          <UButton
              color="primary"
              variant="subtle"
              size="sm"
              :icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showConfirmPassword"
              aria-controls="confirmPassword"
              @click="showConfirmPassword = !showConfirmPassword"
          />
        </UButtonGroup>
      </UFormField>

      <UButton type="submit" trailing-icon="lucide:log-in" size="md" color="primary" variant="solid">Register</UButton>
    </UForm>
  </UCard>
</template>

<style scoped>
#card {
  max-width: 80rem;
  margin: 5rem auto;
}
</style>