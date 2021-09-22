<template>
  <Authenticator>
    <template v-slot="{ signOut, user }">
      <h1 class="text-6xl mb-10">Hello {{ user.username }}!</h1>
      <button className="px-2 bg-white rounded shadow" @click="signOut()">
        Sign Out
      </button>
    </template>
  </Authenticator>
</template>

<script setup lang="ts">
import aws_exports from '@environments/auth-with-username-no-attributes/src/aws-exports';

import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';

import { Authenticator } from '@aws-amplify/ui-vue';

Amplify.configure({
  ...aws_exports,
  auth: {
    login_mechanisms: ['username'],
  },
});
</script>
