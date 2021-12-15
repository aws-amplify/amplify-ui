<script setup lang="ts">
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const services = {
  async handleSignUp(e) {
    const { username, password, attributes } = e;
    return Auth.signUp({ username, password, attributes });
  },
};
</script>

<template>
  <authenticator :services="services">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
