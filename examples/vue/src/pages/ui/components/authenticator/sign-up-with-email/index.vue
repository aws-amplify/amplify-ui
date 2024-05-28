<script setup lang="ts">
import { Amplify } from 'aws-amplify';
import { signUp } from 'aws-amplify/auth';
import { I18n } from 'aws-amplify/utils';
import {
  Authenticator,
  translations,
  useAuthenticator,
} from '@aws-amplify/ui-vue';
import { toRefs } from 'vue';
import '@aws-amplify/ui-vue/styles.css';

const amplifyOutputs =
  import.meta.env.VITE_VERSION === 'gen1'
    ? // @ts-ignore
      (await import('@environments/auth/auth-with-email/src/aws-exports'))
        .default
    : // @ts-ignore
      (await import('@environments/auth/auth-with-email/amplify_outputs'))
        .default;

Amplify.configure(amplifyOutputs);

const { authStatus } = toRefs(useAuthenticator());

const formFields = {
  confirmSignUp: {
    confirmation_code: {
      placeholder: 'Enter the code given',
      isRequired: true,
    },
  },
};

I18n.putVocabularies(translations);
I18n.setLanguage('en');
I18n.putVocabulariesForLanguage('en', {
  'Your code is on the way. To log in, enter the code we emailed to':
    'Enter this code:',
  'It may take a minute to arrive': 'It will take several minutes to arrive',
});

const services = {
  async handleSignUp(input) {
    // custom username and email
    const customUsername = input.username.toLowerCase();
    const customEmail = input.options.userAttributes.email.toLowerCase();
    return signUp({
      ...input,
      username: customUsername,
      options: {
        ...input.options,
        userAttributes: {
          ...input.options.userAttributes,
          email: customEmail,
        },
      },
    });
  },
};
</script>

<template>
  {{ authStatus }}
  <authenticator
    :services="services"
    :form-fields="formFields"
    initial-state="signUp"
  >
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
