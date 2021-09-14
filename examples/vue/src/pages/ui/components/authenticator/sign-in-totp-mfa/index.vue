<template>
  <Authenticator>
    <template v-slot="{ user, send }">
      <h1 class="text-6xl mb-10">Hello {{ user.username }}!</h1>
      <button
        className="px-2 bg-white rounded shadow"
        @click="send('SIGN_OUT')"
      >
        Sign Out
      </button>
    </template>
  </Authenticator>
</template>

<script setup lang="ts">
import aws_exports from '@environments/auth-with-totp-mfa/src/aws-exports';

import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';

import { Authenticator } from '@aws-amplify/ui-vue';

Amplify.configure({
  ...aws_exports,
  auth: {
    login_mechanisms: ['email'],
  },
});
</script>
