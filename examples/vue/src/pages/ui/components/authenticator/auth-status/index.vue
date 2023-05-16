<script setup lang="ts">
import { Amplify, Auth } from 'aws-amplify';
import { computed, toRefs } from 'vue';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const { authStatus } = toRefs(useAuthenticator());
const isAuthenticated = computed(() => authStatus.value === 'authenticated');

const signOut = () => Auth.signOut();

const onSubmit = (event: Event) => {
  Auth.signIn(
    Object.fromEntries(new FormData(event.target as HTMLFormElement)) as any
  );
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>{{ authStatus }}</div>

    <div
      v-if="!isAuthenticated"
      :style="{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }"
    >
      <label for="username">Username</label>
      <input id="username" name="username" />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" />
      <button type="submit">Sign In</button>
    </div>

    <div v-if="isAuthenticated">
      <button type="button" @click="signOut">Sign Out</button>
    </div>
  </form>
</template>
