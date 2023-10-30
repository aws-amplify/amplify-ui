<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { signIn, signOut } from 'aws-amplify/auth';
import { computed, toRefs } from 'vue';

import { useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const { authStatus } = toRefs(useAuthenticator());
const isAuthenticated = computed(() => authStatus.value === 'authenticated');

const handleSignOut = () => signOut();

const onSubmit = (event: Event) => {
  signIn(
    Object.fromEntries(new FormData(event.target as HTMLFormElement)) as any
  );
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>{{ authStatus }}</div>

    <div v-if="!isAuthenticated" :style="{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }">
      <label for="username">Username</label>
      <input id="username" name="username" />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" />
      <button type="submit">Sign In</button>
    </div>

    <div v-if="isAuthenticated">
      <button type="button" @click="handleSignOut">Sign Out</button>
    </div>
  </form>
</template>
