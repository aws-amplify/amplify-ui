<template>
  <Authenticator>
    <template v-slot="{ signOut, user }">
      <h1 class="mb-10 text-6xl">Hello {{ user.username }}!</h1>
      <button className="px-2 bg-white rounded shadow" @click="signOut()">
        Sign Out
      </button>
    </template>
  </Authenticator>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import aws_exports from '@environments/auth-with-multi-alias/src/aws-exports';

import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';

import { Authenticator } from '@aws-amplify/ui-vue';

Amplify.configure({
  ...aws_exports,
  auth: {
    login_mechanisms: ['username', 'email', 'phone_number'],
  },
});

export default defineComponent({
  name: 'App',
  components: { Authenticator },
});
</script>
