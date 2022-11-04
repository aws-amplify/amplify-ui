<script setup lang="ts">
import { Amplify, I18n } from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';
import { Authenticator } from '@aws-amplify/ui-vue';
import { translations } from '@aws-amplify/ui';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

I18n.putVocabularies(translations);
I18n.setLanguage('en');

I18n.putVocabulariesForLanguage('en', {
  'Invalid code or auth state for the user.': 'translated text',
});
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.attributes?.name }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
