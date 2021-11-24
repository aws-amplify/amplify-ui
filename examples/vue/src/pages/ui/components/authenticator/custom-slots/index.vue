<script setup lang="ts">
import Amplify from 'aws-amplify';
import {
  Authenticator,
  // Vue Composable to get access to validation errors
  useAuthenticator,
} from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import { toRefs } from 'vue';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const { toResetPassword, toSignIn } = toRefs(useAuthenticator());
</script>

<template>
  <authenticator>
    <template v-slot:header>
      <div style="padding: var(--amplify-space-large); text-align: center">
        <img
          class="amplify-image"
          alt="Amplify logo"
          src="https://docs.amplify.aws/assets/logo-dark.svg"
        />
      </div>
    </template>

    <template v-slot:sign-in-header>
      <h3
        class="amplify-heading"
        style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
      >
        Sign in to your account
      </h3>
    </template>

    <template v-slot:sign-in-footer>
      <div style="text-align: center">
        <button
          @click="toResetPassword"
          class="amplify-button amplify-field-group__control"
          data-fullwidth="false"
          data-size="small"
          data-variation="link"
          type="button"
          style="font-weight: normal"
        >
          Reset Password
        </button>
      </div>
    </template>

    <template v-slot:sign-up-header>
      <h3
        class="amplify-heading"
        style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
      >
        Create a new account
      </h3>
    </template>

    <template v-slot:sign-up-footer>
      <div style="text-align: center">
        <button
          @click="toSignIn"
          class="amplify-button amplify-field-group__control"
          data-fullwidth="false"
          data-size="small"
          data-variation="link"
          type="button"
          style="font-weight: normal"
        >
          Back to Sign In
        </button>
      </div>
    </template>

    <template v-slot:footer>
      <div style="padding: var(--amplify-space-large); text-align: center">
        <p class="amplify-text" style="color: var(--amplify-colors-neutral-80)">
          © All Rights Reserved
        </p>
      </div>
    </template>

    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
