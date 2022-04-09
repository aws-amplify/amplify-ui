<script setup lang="ts">
import Amplify from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const formFields = {
  signIn: {
    username: {
      dialCode: '+82',
    },
  },
  signUp: {
    phone_number: {
      dialCode: '+227',
      dialCodeList: ['+1', '+82', '+227', '+100', '+227'],
    },
  },
};
</script>

<template>
  <authenticator :form-fields="formFields">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.attributes?.phone_number }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
