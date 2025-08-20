<script setup lang="ts">
import {reactive} from "vue";
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string("Password cannot be empty").min(8, 'Must be at least 8 characters')
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({title: 'Success', description: 'Login info sent', color: 'success'})
  console.log(event.data)
}
</script>

<template>
  <UCard variant="subtle" id="card">
    <template #header>
      <h2 class="text-2xl">Login</h2>
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" placeholder="Email" type="email" trailing-icon="i-lucide-at-sign"/>
      </UFormField>

      <password v-model="state.password" placeholder="Password" label="Password" name="password"/>

      <UButton type="submit" trailing-icon="lucide:log-in" size="md" color="primary" variant="solid">Login</UButton>
    </UForm>
  </UCard>
</template>

<style scoped>
#card {
  max-width: 80rem;
  margin: 5rem auto;
}
</style>