<script setup lang="ts">
import Amplify from 'aws-amplify';
import {
  Authenticator,
  AuthenticatorSignUpFormFields,
  // Vue Composable to get access to validation errors
  useAuthenticator,
  // Amplify UI Primitives to simplify the custom fields
  AmplifyCheckBox,
} from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);
import { toRefs } from 'vue';

const { validationErrors } = toRefs(useAuthenticator());

const services = {
  async validateCustomSignUp(formData) {
    if (!formData.acknowledgement) {
      return {
        acknowledgement: 'You must agree to the Terms & Conditions',
      };
    }
  },
};
</script>

<template>
  <authenticator initial-state="signUp" :services="services">
    <template v-slot:sign-up-fields>
      <authenticator-sign-up-form-fields />
      <amplify-check-box :errorMessage="validationErrors.acknowledgement" />
    </template>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
