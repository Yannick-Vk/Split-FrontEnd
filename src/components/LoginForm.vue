<script setup lang="ts">
import {reactive, ref} from "vue";
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const showPassword = ref(false)

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({title: 'Success', description: 'The form has been submitted.', color: 'success'})
  console.log(event.data)
}
</script>

<template>
  <UCard variant="subtle" id="card">
    <template #header>
      <h2>Login</h2>
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" placeholder="Email" trailing-icon="i-lucide-at-sign"/>
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" placeholder="Password"
                :type="showPassword ? 'text' : 'password'"
                :ui="{ trailing: 'pe-1' }">
          <template #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="password"
                @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
      </UFormField>

      <UButton type="submit" trailing-icon="lucide:log-in" size="md" color="primary" variant="solid">Login</UButton>
    </UForm>
  </UCard>
</template>

<style scoped>
#card {
  max-width: 80rem;
  margin: 5rem auto;
}

h2 {
  font-size: 1.8rem;
}
</style>