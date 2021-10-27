<script setup lang="ts">
import Amplify from 'aws-amplify';
import { ref, onMounted, toRefs } from 'vue';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from '@environments/auth-with-email/src/aws-exports';
// const { send, state } = useAuthenticator();

Amplify.configure(aws_exports);
const { state } = toRefs(useAuthenticator());
</script>

<template>
  <authenticator initial-state="signUp" :login-mechanisms="['email']">
    <template v-slot:sign-up-fields>
      <!-- {{ someFunc(state) }} -->
      {{ state }}
      <h3>Other state</h3>
    </template>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
