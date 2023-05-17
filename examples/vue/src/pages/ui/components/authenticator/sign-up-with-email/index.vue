<script setup lang="ts">
import { Amplify, Auth, Hub, I18n } from 'aws-amplify';
import { Authenticator, translations } from '@aws-amplify/ui-vue';
import { ref, toRefs } from 'vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

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
  async handleSignUp(formData) {
    let { username, password, attributes } = formData;
    // custom username
    username = username.toLowerCase();
    attributes.email = attributes.email.toLowerCase();
    return Auth.signUp({
      username,
      password,
      attributes,
      autoSignIn: {
        enabled: true,
      },
    });
  },
};

const logHub = () => {
  console.log((Hub as any).listeners.auth);
};

const showAuthenticator = ref(true);

const toggleAuthenticator = () => {
  showAuthenticator.value = !showAuthenticator.value;
};
</script>

<template>
  <button @click="logHub">log Hub</button>
  <button @click="toggleAuthenticator">toggle Authenticator</button>
  <authenticator
    v-if="showAuthenticator"
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
