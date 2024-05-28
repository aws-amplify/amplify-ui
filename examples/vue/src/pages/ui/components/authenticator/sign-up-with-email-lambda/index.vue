<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

const amplifyOutputs =
  import.meta.env.VITE_VERSION === 'gen1'
    ? (
        await import(
          // @ts-ignore
          '@environments/auth/auth-with-email-lambda-signup-trigger/src/aws-exports'
        )
      ).default
    : (
        await import(
          // @ts-ignore
          '@environments/auth/auth-with-email-lambda-signup-trigger/amplify_outputs'
        )
      ).default;

Amplify.configure(amplifyOutputs);
</script>

<template>
  <authenticator initial-state="signUp">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
