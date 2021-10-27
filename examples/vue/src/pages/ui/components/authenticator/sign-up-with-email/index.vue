<script setup lang="ts">
import Amplify from 'aws-amplify';
import { toRefs } from 'vue';
import {
  Authenticator,
  SignUpFormFields,
  useAuthenticator,
  BaseTextField,
} from '@aws-amplify/ui-vue';
import CheckBox from './check-box.vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from '@environments/auth-with-email/src/aws-exports';

Amplify.configure(aws_exports);

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
        label="Preferred Username"
        name="preferred_username"
        placeholder="Preferred Username"
        type="text"
      ></base-text-field>
      <sign-up-form-fields />
      <check-box :errorMessage="validationErrors.acknowledgement" />
    </template>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
