<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue';
import { Amplify, I18n } from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from '@environments/auth-with-username-no-attributes/src/aws-exports';

I18n.setLanguage('ja');

Amplify.configure(aws_exports);
</script>
<template>
  <authenticator>
    <template v-slot="{ user, send }">
      <h1 class="mb-10 text-6xl">Hello {{ user.username }}!</h1>
      <button
        className="px-2 bg-white rounded shadow"
        @click="send('SIGN_OUT')"
      >
        Sign Out
      </button>
    </template>
  </authenticator>
</template>
