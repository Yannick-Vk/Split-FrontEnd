<script setup lang="ts">
import {reactive} from "vue";
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'
import type {RegisterUser} from "../types.ts";

const schema = z.object({
  email: z.email('Invalid email'),
  username: z.string("Username cannot be empty"),
  password: z.string("Password cannot be empty").min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string("Confirm password cannot be empty").min(8, 'Must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
  when(payload) {
    return schema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
  },
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  username: undefined,
  password: undefined,
  confirmPassword: undefined,
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({title: 'Success', description: 'Registration sent', color: 'success'})
  const user: RegisterUser = {
    email: event.data.email, password: event.data.password, username: event.data.username,
  }
  console.log(user)
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
          <UInput v-model="state.email" placeholder="Email" type="email"/>
          <UBadge color="neutral" variant="subtle" icon="lucide:at-sign"/>
        </UButtonGroup>
      </UFormField>

      <UFormField label="Username" name="username">
        <UButtonGroup>
          <UInput v-model="state.username" placeholder="Username"/>
          <UBadge color="neutral" variant="subtle" icon="lucide:circle-user-round"/>
        </UButtonGroup>
      </UFormField>

      <password v-model="state.password" placeholder="Password" label="Password" name="password"/>
      <password v-model="state.confirmPassword" placeholder="Confirm password" label="Confirm Password"
                name="confirmPassword"/>

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