<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';
import { Authenticator, translations } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

// @todo-migration remove cast
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
      dialCodeList: ['+1', '+82', '+227', '+100', '+227'],
    },
  },
};
</script>

<template>
  <authenticator :form-fields="formFields">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.attributes?.phone_number }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
