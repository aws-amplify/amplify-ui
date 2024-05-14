<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import {
  Authenticator,
  AuthenticatorSignUpFormFields,
  // Vue Composable to get access to validation errors
  useAuthenticator,
  // Amplify UI Primitives to simplify the custom fields
  AmplifyCheckBox,
} from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

import amplifyOutputs from './amplify_outputs';
import { toRefs } from 'vue';
Amplify.configure(amplifyOutputs);

const { validationErrors } = toRefs(useAuthenticator());

const services = {
  async validateCustomSignUp(formData) {
    if (!formData.acknowledgement) {
      return {
        acknowledgement: 'You must agree to the Terms and Conditions',
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
