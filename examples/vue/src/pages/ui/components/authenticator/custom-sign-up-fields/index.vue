<script setup lang="ts">
import Amplify from 'aws-amplify';
import {
  Authenticator,
  AuthenticatorSignUpFormFields,
  // Vue Composable to get access to validation errors
  useAuthenticator,
  // Amplify UI Primitives to simplify the custom fields
  BaseTextField,
  BaseCheckBox,
} from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

import awsExports from '@environments/auth-with-email-and-custom-attributes/src/aws-exports';
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
  <authenticator
    initial-state="signUp"
    :login-mechanisms="['email']"
    :services="services"
  >
    <template v-slot:sign-up-fields>
      <base-text-field
        id="prefered_username"
        label="Preferred Username"
        name="preferred_username"
        placeholder="Preferred Username"
        type="text"
        :required="false"
      ></base-text-field>
      <authenticator-sign-up-form-fields />
      <base-check-box :errorMessage="validationErrors.acknowledgement" />
    </template>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
