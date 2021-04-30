<template>
  <h1 class="text-6xl mb-10 text-center">
    Amplify Authenticator Examples For Vue.js 3.0
  </h1>

  <example-wrapper :code="defaultExample">
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
  </example-wrapper>

  <example-wrapper
    :title="'Overriding forgot-password'"
    :code="overrideForgotPassword"
  >
    <authenticator>
      <template #sign-in-forgot-password-button>
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

  <example-wrapper :title="'Headless UI Version'" :code="headless">
    <authenticator headless></authenticator>
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

  <example-wrapper :title="'Add confirm password'" :code="confirmPassword">
    <authenticator @sign-up-submit="overRideSubmit">
      <template #sign-up-fields>
        <sign-up-name-control />
        <sign-up-password-control />
        <div class="">
          <h3>Confirm Password</h3>
          <input
            type="password"
            name="confirm_password"
            class="block w-full mt-1 border-gray-300 rounded shadow-sm border p-2"
          />
          <div v-if="error" class="text-red-700">
            Passwords do not match.
          </div>
        </div>
        <sign-up-email-control />
        <sign-up-phone-control />
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
import aws_exports from "./aws-exports";
import VueMarkdownIt from "vue3-markdown-it";
import ExampleSignIn from "./components/example-sign-in.vue";

import ExampleWrapper from "./components/example-wrapper.vue";

import "@aws-amplify/ui-vue/styles.css";

import {
  Authenticator,
  useAuth,
  RenderInfo,
  SignUpEmailControl,
  SignUpPasswordControl,
  SignUpNameControl,
  SignUpPhoneControl
} from "@aws-amplify/ui-vue";

import {
  defaultExample,
  overrideForgotPassword,
  overrideSignInButton,
  headless,
  footer,
  confirmPassword,
  slotTable,
  propTable,
  eventTable
} from "./utils/code-examples";

Amplify.configure(aws_exports);

export default defineComponent({
  name: "App",
  components: {
    Authenticator,
    ExampleWrapper,
    RenderInfo,
    ExampleSignIn,
    SignUpEmailControl,
    SignUpPasswordControl,
    SignUpNameControl,
    SignUpPhoneControl,
    "vue3-markdown-it": VueMarkdownIt
  },
  setup() {
    const { state, send } = useAuth();
    const error = ref(false);

    const overRideSubmit = event => {
      const formData = new FormData(event.target);
      //@ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
      const values = Object.fromEntries(formData);
      if (values.password !== values.confirm_password) {
        error.value = true;
      } else {
        error.value = false;
        const phoneS = `${values.phone_number_prefix}${values.phone_number}`.replace(
          /[^A-Z0-9+]/gi,
          ""
        );
        delete values.phone_number_prefix;
        delete values.confirm_password;
        send({
          type: "SUBMIT",
          //@ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
          data: { ...values, phone_number: phoneS }
        });
      }
    };
    return {
      state,
      send,
      slotTable,
      propTable,
      eventTable,
      overRideSubmit,
      error,
      defaultExample,
      overrideForgotPassword,
      overrideSignInButton,
      headless,
      footer,
      confirmPassword
    };
  }
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
