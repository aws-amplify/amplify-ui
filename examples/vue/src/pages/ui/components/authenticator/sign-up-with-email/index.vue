<script setup lang="ts">
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const services = {
  async handleSignUp(formData) {
    const { username, password, attributes } = formData;
    // custom username
    const newAttributes = {
      ...attributes,
      email: attributes.email.toLowerCase(),
    };
    return Auth.signUp({
      username: username.toLowerCase(),
      password,
      attributes: newAttributes,
    });
  },
};
</script>

<template>
  <authenticator :services="services" initial-state="signUp">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
