<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

const amplifyOutputs =
  import.meta.env.VITE_VERSION === 'gen1'
    ? // @ts-ignore
      (await import('@environments/auth/auth-with-email/src/aws-exports'))
        .default
    : // @ts-ignore
      (await import('@environments/auth/auth-with-email/amplify_outputs'))
        .default;

Amplify.configure(amplifyOutputs);

const router = useRouter();
const { user, signOut } = toRefs(useAuthenticator());
const handleClick = (event) => {
  event.preventDefault();
  signOut.value();
  router.push('../useAuthenticator');
};
</script>

<template>
  <!-- TODO: this authenticator shouldn't be needed -->
  <authenticator></authenticator>
  <div>Hello, {{ user?.username }}!</div>
  <button @click="handleClick">Sign Out</button>
</template>
