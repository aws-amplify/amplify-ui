<script setup lang="ts">
// @todo-migration clean up imports
import { Amplify } from 'aws-amplify';
import * as Auth from 'aws-amplify/auth';
import { I18n } from 'aws-amplify/utils';
import {
  Authenticator,
  translations,
  useAuthenticator,
} from '@aws-amplify/ui-vue';
import { toRefs } from 'vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const { authStatus } = toRefs(useAuthenticator());

const formFields = {
  confirmSignUp: {
    confirmation_code: {
      placeholder: 'Enter the code given',
      isRequired: true,
    },
  },
};
// @todo-migration remove cast
I18n.putVocabularies(translations);
I18n.setLanguage('en');
I18n.putVocabulariesForLanguage('en', {
  'Your code is on the way. To log in, enter the code we emailed to':
    'Enter this code:',
  'It may take a minute to arrive': 'It will take several minutes to arrive',
});

const services = {
  async handleSignUp(formData) {
    let { username, password, attributes } = formData;
    // custom username
    username = username.toLowerCase();
    attributes.email = attributes.email.toLowerCase();
    return Auth.signUp({
      username,
      password,
      options: {
        userAttributes: attributes,
        autoSignIn: true,
      },
    });
  },
};
</script>

<template>
  {{ authStatus }}
  <authenticator :services="services" :form-fields="formFields" initial-state="signUp">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
