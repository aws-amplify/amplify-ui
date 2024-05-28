<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

const amplifyOutputs =
  import.meta.env.VITE_VERSION === 'gen1'
    ? (
        await import(
          // @ts-ignore
          '@environments/auth/auth-with-username-no-attributes/src/aws-exports'
        )
      ).default
    : (
        await import(
          // @ts-ignore
          '@environments/auth/auth-with-username-no-attributes/amplify_outputs'
        )
      ).default;

Amplify.configure(amplifyOutputs);
const formFields = {
  signUp: {
    phone_number: {
      dialCode: '+227',
      dialCodeList: ['+1', '+82', '+227', '+100'],
    },
  },
};
</script>

<template>
  <authenticator
    :form-fields="formFields"
    :sign-up-attributes="['phone_number']"
  >
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
