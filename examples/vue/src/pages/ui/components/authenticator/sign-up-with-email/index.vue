<script setup lang="ts">
import { Amplify } from '@aws-amplify/core';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from '@environments/auth-with-email/src/aws-exports';

Amplify.configure(aws_exports);
</script>

<template>
  <authenticator initial-state="signUp" :login-mechanisms="['email']">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
