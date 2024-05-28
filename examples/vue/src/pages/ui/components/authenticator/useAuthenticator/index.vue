<script setup lang="ts">
import { toRefs } from 'vue';
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

const { route } = toRefs(useAuthenticator());
const props = useAuthenticator();
</script>

<template>
  <authenticator>
    <template v-slot>
      <router-link to="useAuthenticator/home">
        <button>Navigate to Home</button>
      </router-link>
    </template>
  </authenticator>
</template>
