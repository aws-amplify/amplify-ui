<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { signIn, signOut } from 'aws-amplify/auth';
import { computed, toRefs } from 'vue';

import { useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import { importHelper } from '../utils';

const amplifyOutputs = await importHelper('auth-with-email');

Amplify.configure(amplifyOutputs);

const { authStatus } = toRefs(useAuthenticator());
const isAuthenticated = computed(() => authStatus.value === 'authenticated');

const handleSignOut = () => signOut();

const onSubmit = (event: any) => {
  signIn({
    username: event.target.email.value,
    password: event.target.password.value,
  });
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>{{ authStatus }}</div>

    <div
      v-if="!isAuthenticated"
      :style="{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }"
    >
      <label for="email">Email</label>
      <input id="email" name="email" />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" />
      <button type="submit">Sign In</button>
    </div>

    <div v-if="isAuthenticated">
      <button type="button" @click="handleSignOut">Sign Out</button>
    </div>
  </form>
</template>
