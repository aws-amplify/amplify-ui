<template>
  <Authenticator>
    <template v-slot="{ user, send }">
      <h1 class="text-6xl mb-10">Hello {{ user.username }}!</h1>
      <button
        className="px-2 bg-white rounded shadow"
        @click="send('SIGN_OUT')"
      >
        Sign Out
      </button>
    </template>
  </Authenticator>
</template>

<script setup lang="ts">
import aws_exports from '@environments/auth-with-email/src/aws-exports';
import { DefaultTexts } from '@aws-amplify/ui';

import Amplify, { I18n } from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';

import { Authenticator } from '@aws-amplify/ui-vue';

I18n.setLanguage('ja');
I18n.putVocabulariesForLanguage('ja', {
  [DefaultTexts.CONFIRM_PASSWORD_LABEL]: 'パスワードの確認',
  [DefaultTexts.CONFIRM_SMS_LABEL]: 'SMSコードを確認する',
  [DefaultTexts.CONFIRM_TOTP_LABEL]: 'TOTPコードを確認する',
});

Amplify.configure({
  ...aws_exports,
  auth: {
    login_mechanisms: ['email'],
  },
});
</script>
