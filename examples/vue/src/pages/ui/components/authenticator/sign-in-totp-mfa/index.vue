<script setup lang="ts">
import Amplify from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const auth = useAuthenticator();
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <span>{{ auth.user?.username }}</span>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
