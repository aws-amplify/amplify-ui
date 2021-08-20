<template>
  <amplify-chatbot />
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
import aws_exports from '@environments/auth-with-email/src/aws-exports';

import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue/styles.css';

import { applyPolyfills } from '@aws-amplify/ui-components/loader';

// import { defineCustomElements } from '@aws-amplify/ui-components/dist/components/index';
import {
  AmplifyChatbot,
  AmplifyButton,
  AmplifyInput,
  AmplifyToast,
} from '@aws-amplify/ui-components/dist/components';

applyPolyfills().then(() => {
  // defineCustomElements(window);
  customElements.define('amplify-button', AmplifyButton);
  customElements.define('amplify-input', AmplifyInput);
  customElements.define('amplify-toast', AmplifyToast);
  customElements.define('amplify-chatbot', AmplifyChatbot);
});

import { Authenticator, useAuth } from '@aws-amplify/ui-vue';

Amplify.configure({
  ...aws_exports,
  auth: {
    login_mechanisms: ['email'],
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
