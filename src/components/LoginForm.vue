<script setup lang="ts">
import {reactive} from "vue";
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'

import type {UserLogin} from '../types.ts'
import {useAuthStore} from "../stores/AuthStore.ts";

const authStore = useAuthStore();

const schema = z.object({
  username: z.string('Username/Email cannot be empty').trim().min(1, "Username/Email cannot be empty"),
  password: z.string("Password cannot be empty").min(8, 'Must be at least 8 characters')
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const user: UserLogin = {
    username: event.data.username,
    password: event.data.password,
  };
  console.log(user)
  const options = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    accepts: "application/json",
    body: JSON.stringify(user)
  };
  const response = await fetch('http://localhost:5079/api/v1/auth/login', options)
  if (!response.ok) {
    console.error("Login error:", response.statusText)
    toast.add({title: 'Login failed', description: `Failed to login, reason: ${response.statusText}`, color: 'error'})
    return;
  }
  await authStore.LoginUser(user);
  toast.add({title: 'Success', description: 'Login info sent', color: 'success'})
}
</script>

<template>
  <UCard variant="subtle" id="card">
    <template #header>
      <h2 class="text-2xl text-center">Login</h2>
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4 flex flex-col items-center" @submit="onSubmit">
      <UFormField label="Username/Email" name="username">
        <UButtonGroup>
          <UInput v-model="state.username" placeholder="Username or Email"/>
          <UBadge color="neutral" variant="subtle" size="lg" icon="lucide:at-sign"/>
        </UButtonGroup>
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