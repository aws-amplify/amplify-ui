<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import { Authenticator, translations } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

const amplifyOutputs =
  import.meta.env.VITE_VERSION === 'gen1'
    ? (
        await import(
          // @ts-ignore
          '@environments/auth/auth-with-phone-number/src/aws-exports'
        )
      ).default
    : (
        await import(
          // @ts-ignore
          '@environments/auth/auth-with-phone-number/amplify_outputs'
        )
      ).default;

Amplify.configure(amplifyOutputs);

I18n.putVocabularies(translations);
I18n.setLanguage('en');
I18n.putVocabulariesForLanguage('en', {
  'Password does not conform to policy: Password not long enough':
    'Your password is too short! Try a longer password!',
});

const formFields = {
  signIn: {
    username: {
      dialCode: '+82',
    },
  },
  signUp: {
    phone_number: {
      dialCode: '+227',
      dialCodeList: ['+1', '+82', '+227', '+100'],
    },
  },
};
</script>

<template>
  <authenticator :form-fields="formFields">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
