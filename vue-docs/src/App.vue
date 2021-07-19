<template>
  <h1 class="text-6xl mb-10 text-center">
    Amplify Authenticator Examples For Vue.js 3.0
  </h1>

  <example-wrapper :code="defaultExample">
    <authenticator>
      <template v-slot="{ user }">
        <h1 class="text-6xl mb-10">Welcome {{ user.username }}!</h1>
        <button
          className="px-2 bg-white rounded shadow"
          @click="send('SIGN_OUT')"
        >
          Sign Out
        </button>
      </template>
    </authenticator>
  </example-wrapper>

  <example-wrapper
    :title="'Overriding forgot password section'"
    :code="overrideForgotPassword"
  >
    <authenticator>
      <template #sign-in-forgot-password-section>
        <button>New Button</button>
      </template>
    </authenticator>
  </example-wrapper>

  <example-wrapper
    :title="'Overriding sign-in button slot'"
    :code="overrideSignInButton"
  >
    <authenticator>
      <template #sign-in-button>
        <button class="text-white p-3 rounded-sm bg-blue-600">
          New Sign In Button
        </button>
      </template>
      <button className="p-3 bg-white rounded shadow" @click="send('SIGN_OUT')">
        Sign Out
      </button>
    </authenticator>
  </example-wrapper>

  <example-wrapper
    :title="'Updating Footer And Render Information'"
    :code="footer"
  >
    <authenticator>
      <template #sign-in-footer="{ info}">
        <h3>New Footer Details</h3>
        <footer data-amplify-footer>
          <render-info :info="info"></render-info>
        </footer>
      </template>
    </authenticator>
  </example-wrapper>

  <example-sign-in></example-sign-in>

  <example-wrapper :title="'Customize Sign In Fields'" :code="customPassword">
    <authenticator>
      <button
        className="px-2 bg-white rounded shadow"
        @click="send('SIGN_OUT')"
      >
        Sign Out
      </button>
      <template #sign-in-fields>
        <user-name-alias />
        <div>
          <h3>Custom Password Field</h3>
          <input
            type="password"
            name="password"
            class="block w-full mt-1 border-gray-300 rounded shadow-sm border p-4"
            placeholder="PASSWORD PLEASE!"
          />
        </div>
      </template>
    </authenticator>
  </example-wrapper>

  <hr class="my-20 w-full text-black" />

  <h2 class="text-3xl mb-10">Props</h2>

  <vue3-markdown-it :source="propTable" />
  <div class="italic mt-5">
    All other texts are provided by internationalizaton
  </div>
  <hr class="my-20 w-full text-black" />
  <h2 class="text-3xl mb-10">Slots</h2>
  <vue3-markdown-it :source="slotTable" />

  <hr class="my-20 w-full text-black" />
  <h2 class="text-3xl mb-10">Events</h2>
  <vue3-markdown-it :source="eventTable" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Amplify from "aws-amplify";
import aws_exports from "../../environments/auth-with-phone-number/src/aws-exports";
import VueMarkdownIt from "vue3-markdown-it";
import ExampleSignIn from "./components/example-sign-in.vue";

import ExampleWrapper from "./components/example-wrapper.vue";

import "@aws-amplify/ui-vue/styles.css";

import {
  Authenticator,
  useAuth,
  RenderInfo,
  UserNameAlias,
} from "@aws-amplify/ui-vue";

import {
  defaultExample,
  overrideForgotPassword,
  overrideSignInButton,
  footer,
  slotTable,
  propTable,
  eventTable,
  customPassword,
} from "./utils/code-examples";

Amplify.configure({
  ...aws_exports,
  auth: {
    login_mechanisms: ["phone_number"],
  },
});

export default defineComponent({
  name: "App",
  components: {
    Authenticator,
    ExampleWrapper,
    RenderInfo,
    ExampleSignIn,
    UserNameAlias,
    "vue3-markdown-it": VueMarkdownIt,
  },
  setup() {
    const { state, send } = useAuth();
    const error = ref(false);

    return {
      state,
      send,
      slotTable,
      propTable,
      eventTable,
      error,
      defaultExample,
      overrideForgotPassword,
      overrideSignInButton,
      footer,
      customPassword,
    };
  },
});
</script>

<style>
#app {
  width: 1024px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

tr > th {
  font-size: 20px;
  border: 1px solid black;
  padding: 6px;
}
td {
  border: 1px solid black;
  padding: 11px;
  font-size: 14px;
}

code[class*="language-"],
pre[class*="language-"] {
  /* white-space: normal !important; */
  padding: 0 !important;
  margin: 0 !important;
}
</style>
