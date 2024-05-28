<script setup lang="ts">
import { Authenticator, translations } from '@aws-amplify/ui-vue';
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import '@aws-amplify/ui-vue/styles.css';

const amplifyOutputs =
  import.meta.env.VITE_VERSION === 'gen1'
    ? // @ts-ignore
      (await import('@environments/auth/auth-with-email/src/aws-exports'))
        .default
    : // @ts-ignore
      (await import('@environments/auth/auth-with-email/amplify_outputs'))
        .default;

I18n.putVocabularies(translations);
I18n.setLanguage('ja');
I18n.putVocabulariesForLanguage('ja', {
  'Sign In': 'Sign In Custom',
  'User does not exist.': 'Error with your user',
  'Incorrect username or password.': 'Error with your user',
});

Amplify.configure(amplifyOutputs);
</script>
<template>
  <authenticator initial-state="signUp">
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
