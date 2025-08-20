<script setup lang="ts">
import {reactive} from "vue";
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'
import type {Split} from "../types.ts";

const schema = z.object({
  username: z.string("Username cannot be empty").trim().nonempty("Username cannot be empty"),
  amount: z.number("Amount cannot be empty").positive("Amount must be a positive number"),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  amount: 0.00,
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const split: Split = {
    id: 0, payer: {id: 0, email: "", username: event.data.username}, user: {id: 0, email: "", username: ""}
  }
  toast.add({title: 'Split registered', description: `Split registered for ${event.data.username} with the amount of ${event.data.amount}`, color: 'success'})
  console.log(split)
}
</script>

<template>
  <UCard variant="subtle" id="card">
    <template #header>
      <h2 class="text-2xl">Split</h2>
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Username" name="username">
        <UButtonGroup>
          <UInput v-model="state.username" placeholder="Username"/>
          <UBadge color="neutral" variant="subtle" size="lg" icon="lucide:circle-user-round"/>
        </UButtonGroup>
      </UFormField>

      <UFormField label="Amount" name="amount">
        <UButtonGroup>
          <u-badge color="neutral" variant="subtle" size="lg"> EUR</u-badge>
          <UInputNumber v-model="state.amount" orientation="vertical" :min="0" :step="0.01"/>
        </UButtonGroup>
      </UFormField>

      <UButton type="submit" trailing-icon="lucide:arrow-right-from-line" size="md" color="primary" variant="solid">
        Split
      </UButton>
    </UForm>
  </UCard>
</template>

<style scoped>
#card {
  max-width: 80rem;
  margin: 5rem auto;
}
</style>