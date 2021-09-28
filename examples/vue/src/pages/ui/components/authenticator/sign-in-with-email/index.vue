<template>
  <authenticator :login-mechanisms="loginMechanisms">
    <template v-slot="{ user, signOut }">
      <h1 class="text-6xl mb-10">Hello {{ user.username }}!</h1>
      <button className="px-2 bg-white rounded shadow" @click="signOut">
        Sign Out
      </button>
    </template>
  </authenticator>
</template>

<script setup lang="ts">
import aws_exports from '@environments/auth-with-email/src/aws-exports';

import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';

import { Authenticator } from '@aws-amplify/ui-vue';

const loginMechanisms = ['email'];

Amplify.configure(aws_exports);
</script>
