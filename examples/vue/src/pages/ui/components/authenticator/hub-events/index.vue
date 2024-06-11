<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import { importHelper } from '../utils';

const amplifyOutputs = await importHelper('auth-with-email');

Amplify.configure(amplifyOutputs);
</script>

<template>
  <authenticator>
    <template v-slot="{ user }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut()">Sign Out</button>
    </template>
  </authenticator>
</template>
