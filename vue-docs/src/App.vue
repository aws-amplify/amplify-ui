<template>
  <h1 class="text-6xl mb-10 text-center">
    Amplify Authenticator Examples For Vue.js 3.0
  </h1>

  <Example :code="defaultExample">
    <amplify-provider defaults>
      <authenticator>
        <h1 class="text-6xl mb-10">
          Welcome {{ state?.context?.user?.username }}!
        </h1>
        <button
          className="px-2 bg-white rounded shadow"
          @click="send('SIGN_OUT')"
        >
          Sign Out
        </button>
      </authenticator>
    </amplify-provider>
  </Example>

  <Example :title="'Overriding forgot-password'" :code="overrideForgotPassword">
    <amplify-provider defaults>
      <authenticator>
        <template #sign-in-forgot-password-button>
          <button>New Button</button>
        </template>
      </authenticator>
    </amplify-provider>
  </Example>

  <Example :title="'Overriding sign-in button'" :code="overrideSignInButton">
    <amplify-provider defaults>
      <authenticator>
        <template #sign-in-sign-in-button>
          <button>New Sign In Button</button>
        </template>
        <button
          className="px-2 bg-white rounded shadow"
          @click="send('SIGN_OUT')"
        >
          Sign Out
        </button>
      </authenticator>
    </amplify-provider>
  </Example>

  <Example :title="'Headless UI Version'" :code="headless">
    <amplify-provider>
      <authenticator></authenticator>
    </amplify-provider>
  </Example>

  <hr class="my-20 w-full text-black" />

  <h2 class="text-3xl mb-10">Props</h2>

  <div class="italic">All texts are provided by internationalizaton</div>
  <hr class="my-20 w-full text-black" />
  <h2 class="text-3xl mb-10">Slots</h2>
  <vue3-markdown-it :source="slotTable" />

  <hr class="my-20 w-full text-black" />
  <h2 class="text-3xl mb-10">Events</h2>
  <vue3-markdown-it :source="eventTable" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import VueMarkdownIt from 'vue3-markdown-it';

import Example from './components/Example.vue';

Amplify.configure(aws_exports);
import '@aws-amplify/ui-vue/styles.css';
import { AmplifyProvider, Authenticator, useAuth } from '@aws-amplify/ui-vue';

export default defineComponent({
  name: 'App',
  components: {
    AmplifyProvider,
    Authenticator,
    Example,
    'vue3-markdown-it': VueMarkdownIt
  },
  data: () => ({
    // Code Examples

    defaultExample: `
  <amplify-provider defaults>
    <authenticator> </authenticator>
  </amplify-provider>


  <script setup>
  import { Authenticator, AmplifyProvider } 
                  from "@aws-amplify/spark-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `,
    overrideForgotPassword: `
    <amplify-provider defaults>
      <authenticator>
        <template #sign-in-forgot-password-button>
          <button>New Button</button>
        </template>
      </authenticator>
    </amplify-provider>

  <script setup>
  import {  Authenticator, AmplifyProvider } 
                  from "@aws-amplify/ui-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `,
    overrideSignInButton: `
    <amplify-provider defaults>
      <authenticator>
        <template #sign-in-sign-in-button>
          <button>New Sign In Button</button>
        </template>
      </authenticator>
    </amplify-provider>

  <script setup>
  import {  Authenticator, AmplifyProvider } 
                  from "@aws-amplify/ui-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `,
    headless: `
    <amplify-provider> 
      <authenticator></authenticator>
    </amplify-provider>

    <script setup>
    import { Authenticator, AmplifyProvider }
                  from "@aws-amplify/ui-vue";
    <\/script>
    `
  }),
  setup() {
    const { state, send } = useAuth();

    const slotTable =
      ' | Name                   |                  Description                   |                           Scoped Slots                           | \n' +
      ' | ---------------------- | :--------------------------------------------: | :--------------------------------------------------------------: | \n' +
      ' | form                   |       Replaces the **<form>** DOM Element        |            Exposes **{ slotData }** default child data              | \n' +
      ' | full-name              | Replaces the **<span>** label text for Full name |                               None                               | \n' +
      ' | forgot-password-button |      Replaces the forgot password button       |              Exposes  **{ onForgotPasswordClicked }**               | \n' +
      ' | sign-in-button         |          Replaces the sign in button           |               Exposes **{ onSignInButtonClicked }**                | \n' +
      '| heading                |           Replaces the heading text            |                               none                               | \n' +
      '| footer                 |      Replaces the **<footer>** DOM element       | Exposes **{ onSignInButtonClicked, info, onCreateAccountClicked }** | \n';

    const eventTable =
      '| Name                    |                                                Description | \n' +
      '| ----------------------- | :---------------------------------------------------------: | \n' +
      '| sign-in-button-clicked  |         Emits and overrides when sign in button is clicked | \n' +
      '| forgot-password-clicked | Emits and overrides when forgot password button is clicked | \n' +
      '| create-account-clicked  |  Emits and overrides when create account button is clicked | \n';

    return { state, send, slotTable, eventTable };
  }
});
</script>

<style>
#app {
  width: 768px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

tr > th {
  font-size: 20px;
  border: 1px solid black;
}
td {
  border: 1px solid black;
  padding: 11px;
  font-size: 14px;
}

code[class*='language-'],
pre[class*='language-'] {
  /* white-space: normal !important; */
  padding: 0 !important;
  margin: 0 !important;
}
</style>
