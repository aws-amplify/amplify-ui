<script setup lang="ts">
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';
import { Authenticator } from '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
