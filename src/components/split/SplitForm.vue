<script setup lang="ts">
import {reactive} from "vue";
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'
import type {Split} from "../../types.ts";
import {useAuthStore} from "../../stores/AuthStore.ts";
import {storeToRefs} from "pinia";

const authStore = useAuthStore();
const {user} = storeToRefs(authStore);

const emit = defineEmits<{
  add: [split: Split],
}>()

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
  if (!user.value) {
    console.error("User does not exist");
    return;
  }
  const split: Split = {
    payer: {email: "", username: event.data.username},
    user: {email: user.value.Email, username: user.value.UserName},
    amount: event.data.amount,
  }
  await addItem(split)
}

async function addItem(split: Split) {
  toast.add({
    title: 'Split registered',
    description: `Split registered for ${split.payer.username} with the amount of ${split.amount}`,
    color: 'success'
  })
  console.log(split)
  emit('add', split)
}

</script>

<template>
  <UCard variant="subtle" id="card" class="mt-5">
    <template #header>
      <h2 class="text-2xl text-center">Split</h2>
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4 flex flex-col items-center" @submit="onSubmit">
      <UFormField label="Username" name="username" class="w-60">
        <UButtonGroup class="w-full">
          <UBadge color="neutral" variant="subtle" size="lg" icon="lucide:user-round"/>
          <UInput v-model="state.username" placeholder="Username" class="w-full"/>
        </UButtonGroup>
      </UFormField>

      <UFormField label="Amount" name="amount" class="w-60">
        <UButtonGroup class="w-full">
          <u-badge color="neutral" variant="subtle" size="lg"> EUR</u-badge>
          <UInputNumber v-model="state.amount" orientation="vertical" :min="0" :step="0.01" class="w-full"/>
        </UButtonGroup>
      </UFormField>

      <UButton type="submit" trailing-icon="lucide:arrow-right-from-line" size="md" color="primary" variant="solid">
        Split
      </UButton>
    </UForm>
  </UCard>
</template>

<style scoped>
</style>