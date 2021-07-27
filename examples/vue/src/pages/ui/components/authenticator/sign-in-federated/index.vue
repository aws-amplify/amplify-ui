<template>
  <Authenticator>
    <template v-slot="{ user }">
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

<script lang="ts">
import { defineComponent } from 'vue';
//@ts-ignore
import aws_exports from '@environments/auth-with-federated/src/aws-exports';

import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';

import { Authenticator, useAuth } from '@aws-amplify/ui-vue';

Amplify.configure({
  ...aws_exports,
  auth: {
    login_mechanisms: ['email', 'facebook', 'amazon', 'google'],
  },
});

export default defineComponent({
  name: 'App',
  components: { Authenticator },
  setup() {
    const { send } = useAuth();
    return { send };
  },
});
</script>
