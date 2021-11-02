<script setup lang="ts">
import Amplify from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from '@environments/auth-with-email/src/aws-exports';

Amplify.configure(aws_exports);
</script>

<template>
  <h3>Hello World</h3>
  <h3>Hello World</h3>
  <h3>Hello World</h3>
  <h3>Hello World</h3>
  <authenticator :login-mechanisms="['email']">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
<style>
[data-amplify-authenticator] {
  position: relative;
}

.amplify-tabs {
  display: none;
}
</style>
