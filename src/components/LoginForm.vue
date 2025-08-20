<script setup lang="ts">

import {ref} from "vue";

const userName = ref("");
const password = ref('');
</script>

<template>
  <form>
    <label for="username">Username</label>
    <input type="text" id="username" v-model="userName">

    <label for="password">Password</label>
    <input type="password" id="password" v-model="password">

    <button type="submit">Login</button>
  </form>
</template>

<style scoped>

</style>