<script setup lang="ts">
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
</script>

<template>
  <authenticator :hide-sign-up="true">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>

    <template v-slot:verify-user-header>
      <h3
        class="amplify-heading"
        style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
      >
        Enter Information:
      </h3>
    </template>

    <template v-slot:verify-user-footer>
      <div>Footer Information</div>
    </template>

    <template v-slot:confirm-verify-user-header>
      <h3
        class="amplify-heading"
        style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
      >
        Enter Information:
      </h3>
    </template>

    <template v-slot:confirm-verify-user-footer>
      <div>Footer Information</div>
    </template>
  </authenticator>
</template>
