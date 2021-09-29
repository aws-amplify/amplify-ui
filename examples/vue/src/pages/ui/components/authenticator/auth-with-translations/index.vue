<script setup lang="ts">
import { DefaultTexts } from '@aws-amplify/ui';
import Amplify, { I18n } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from '@environments/auth-with-email/src/aws-exports';

I18n.setLanguage('ja');
I18n.putVocabulariesForLanguage('ja', {
  [DefaultTexts.CONFIRM_PASSWORD_LABEL]: 'パスワードの確認',
  [DefaultTexts.CONFIRM_SMS_LABEL]: 'SMSコードを確認する',
  [DefaultTexts.CONFIRM_TOTP_LABEL]: 'TOTPコードを確認する',
});

Amplify.configure(aws_exports);
</script>

<template>
  <authenticator :login-mechanisms="['email']">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
