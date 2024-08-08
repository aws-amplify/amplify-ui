<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import { importHelper } from '../utils';

const amplifyOutputs = await importHelper('auth-with-username-no-attributes');

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
