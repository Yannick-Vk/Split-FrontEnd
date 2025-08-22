<script setup lang="ts">
import {reactive} from "vue";
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'
import type {Split, User} from "../../types.ts";

const props = defineProps<{ user: User }>();
const emit = defineEmits<{
  add: [split: Split],
}>()

const schema = z.object({
  username: z.string("Username cannot be empty").trim().nonempty("Username cannot be empty"),
  amount: z.number("Amount cannot be empty").positive("Amount must be a positive number"),
  payer: z.boolean(),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  amount: 0.00,
  payer: false,
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {

  const split: Split = event.data.payer ? {
    receiver: {email: "", username: event.data.username},
    payer: {email: props.user.email, username: props.user.username},
    amount: event.data.amount,
  } : {
    payer: {email: "", username: event.data.username},
    receiver: {email: props.user.email, username: props.user.username},
    amount: event.data.amount,
  };
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
  <UCard variant="subtle" id="card" class="mt-5 mb-8">
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

      <UFormField class="w-60">
        <USwitch label="Payer" description="Check this if you paid."
                 unchecked-icon="i-lucide-x" checked-icon="i-lucide-check"
                 color="success" size="lg"
                 v-model="state.payer"
        />
      </UFormField>

      <UButton type="submit" trailing-icon="lucide:arrow-right-from-line" size="md" color="primary" variant="solid">
        Split
      </UButton>
    </UForm>
  </UCard>
</template>

<style scoped>
</style>