<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import '@aws-amplify/ui-vue/styles.css';
import { Authenticator } from '@aws-amplify/ui-vue';
import { translations } from '@aws-amplify/ui';
import amplifyOutputs from './amplify_outputs';

Amplify.configure(amplifyOutputs);

I18n.putVocabularies(translations);
I18n.setLanguage('en');

I18n.putVocabulariesForLanguage('en', {
  'CodeMismatchException: Invalid code or auth state for the user.':
    'invalid code',
});
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
./amplify_outputs
