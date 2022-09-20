<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import {
  Authenticator,
  AuthenticatorForceNewPasswordFormFields,
  AmplifyTextField,
} from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
</script>

<template>
  <authenticator initial-state="signUp">
    <template v-slot:force-new-password-form-fields>
      <authenticator-force-new-password-form-fields />
      <amplify-text-field
        label="Zone Info"
        id="12233"
        autocomplete="false"
        placeholder="Zone Info"
        name="zoneinfo"
        :hideLabel="false"
      />
    </template>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
