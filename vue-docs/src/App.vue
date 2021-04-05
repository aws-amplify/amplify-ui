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
        <template #authenticator-si--forgot-password-button>
          <button>New Button</button>
        </template>
      </authenticator>
    </amplify-provider>
  </Example>

  <Example :title="'Overriding sign-in button'" :code="overrideSignInButton">
    <amplify-provider defaults>
      <authenticator>
        <template #authenticator-si--sign-in-button>
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

  <Example :title="'Updating Footer And Render Information'" :code="footer">
    <amplify-provider defaults>
      <authenticator>
        <template #authenticator-si--footer="{ info}">
          <h3>New Footer Details</h3>
          <footer data-amplify-footer>
            <render-info :info="info"></render-info>
          </footer>
        </template>
      </authenticator>
    </amplify-provider>
  </Example>

  <example-sign-in-CSS> </example-sign-in-CSS>

  <Example :title="'Add confirm password'">
    <amplify-provider defaults>
      <authenticator>
        <template #sign-up>
          <sign-up @sign-up-submit="over">
            <template #additional-fields="">
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
            </template>
          </sign-up>
        </template>
      </authenticator>
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
import { defineComponent, ref } from "vue";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import VueMarkdownIt from "vue3-markdown-it";
import ExampleSignInCSS from "./components/ExampleSignInCSS.vue";

import Example from "./components/Example.vue";

import "@aws-amplify/ui-vue/styles.css";

import {
  AmplifyProvider,
  Authenticator,
  useAuth,
  RenderInfo,
  SignUp
} from "@aws-amplify/ui-vue";

Amplify.configure(aws_exports);

export default defineComponent({
  name: "App",
  components: {
    AmplifyProvider,
    Authenticator,
    Example,
    RenderInfo,
    ExampleSignInCSS,
    SignUp,
    "vue3-markdown-it": VueMarkdownIt
  },
  data: () => ({
    // Code Examples

    defaultExample: `
  <amplify-provider defaults>
    <authenticator> </authenticator>
  </amplify-provider>


  <script setup>
  import { Authenticator, AmplifyProvider } from "@aws-amplify/spark-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `,
    overrideForgotPassword: `
    <amplify-provider defaults>
      <authenticator>
        <template #authenticator-si--forgot-password-button>
          <button>New Button</button>
        </template>
      </authenticator>
    </amplify-provider>

  <script setup>
  import {  Authenticator, AmplifyProvider } from "@aws-amplify/ui-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `,
    overrideSignInButton: `
    <amplify-provider defaults>
      <authenticator>
        <template #authenticator-si--sign-in-button>
          <button>New Sign In Button</button>
        </template>
      </authenticator>
    </amplify-provider>

  <script setup>
  import {  Authenticator, AmplifyProvider } from "@aws-amplify/ui-vue";

  import "@aws-amplify/ui-vue/styles.css";
  <\/script>
    `,
    headless: `
    <amplify-provider> 
      <authenticator></authenticator>
    </amplify-provider>

    <script setup>
    import { Authenticator, AmplifyProvider } from "@aws-amplify/ui-vue";
    <\/script>
    `,
    footer: `
    <amplify-provider defaults>
      <authenticator>
        <template #authenticator-si--footer="{ info }">
          <h3>New Footer Details</h3>
          <footer data-amplify-footer>
            <render-info :info="info"></render-info>
          </footer>
        </template>
      </authenticator>
    </amplify-provider

    <script setup>
    import { Authenticator, AmplifyProvider, RenderInfo } from 
                                        "@aws-amplify/ui-vue";
    <\/script>
    `
  }),
  setup() {
    const { state, send } = useAuth();
    const error = ref(false);

    const slotTable =
      " | Name                   |                  Description                   |                           Scoped Slots                           |      Component              |   \n" +
      " | ---------------------- | :--------------------------------------------: | :--------------------------------------------------------------: | :--------------------------: | \n" +
      " | form                   |       Replaces the **<form>** DOM Element        |            Exposes **{ info }** default child data         | **<sign-in>**               | \n" +
      " | full-name              | Replaces the **<span>** label text for Full name |                               None                             | **<sign-in>**               | \n" +
      " | forgot-password-button |      Replaces the forgot password button       |              Exposes  **{ onForgotPasswordClicked }**            | **<sign-in>**               | \n" +
      " | sign-in-button         |          Replaces the sign in button           |               Exposes **{ onSignInSubmit }**              | **<sign-in>**               | \n" +
      "| heading                |           Replaces the heading text            |                               none                               | **<sign-in>**                | \n" +
      "| footer                 |      Replaces the **<footer>** DOM element       | Exposes **{ onSignInSubmit, info, onCreateAccountClicked }** | **<sign-in>**           | \n" +
      " | additional-fields      | Space below password input   |                               None                             | **<sign-in>**               | \n" +
      " | additional-fields      | Space below password input   |                               None                             | **<sign-up>**               | \n" +
      " | footer      | Replaces footer at the bottom | Exposes **{info, onHaveAccountClicked, onSignUpSubmit}**                             | **<sign-up>** | \n" +
      " | footer-left      | Replaces the footer on the left  | Exposes **{ onHaveAccountClicked }** | **<sign-up>**               | \n" +
      " | footer-right      | Replaces the footer on the right | Exposes **{ onSignUpSubmit }**   | **<sign-up>**               | \n" +
      "| authenticator-si-sign-in-button | Replaces the sign in button                    |    Exposes **{ onSignInSubmit }**                        |  **<authenticator>**         | \n" +
      "| authenticator-si--forgot-password-button | Replaces the forgot password button                    |    Exposes **{ onForgotPasswordClicked }**                        |  **<authenticator>**         | \n" +
      "| authenticator-si--heading                |           Replaces the heading text            |                               none                               | **<authenticator>**                | \n" +
      "| authenticator-si--footer                 |      Replaces the **<footer>** DOM element       | Exposes **{ onSignInSubmit, info, onCreateAccountClicked }** | **<authenticator>**           | \n" +
      " | authenticator-si--form                   |       Replaces the **<form>** DOM Element        |            Exposes **{ info }** default child data         | **<authenticator>**               | \n" +
      " | authenticator-si--full-name              | Replaces the **<span>** label text for Full name |                               None                             | **<authenticator>**               | \n" +
      " | authenticator-su--additional-fields      | Space below password input   |                               None                             | **<authenticator>**               | \n" +
      " | authenticator-su--footer      | Replaces footer at the bottom | Exposes **{info, onHaveAccountClicked, onSignUpSubmit}**                             | **<authenticator>** | \n" +
      " | authenticator-su--footer-left      | Replaces the footer on the left  | Exposes **{ onHaveAccountClicked }** | **<authenticator>**               | \n" +
      " | authenticator-su--footer-right      | Replaces the footer on the right | Exposes **{ onSignUpSubmit }**   | **<authenticator>**               | \n";

    const eventTable =
      "| Name                    |                                                Description | Component | \n" +
      "| ----------------------- | :---------------------------------------------------------: | :----------------: \n" +
      "| sign-in-submit  |         Emits and overrides when sign in button is submitted | **<sign-ip>**    | \n" +
      "| forgot-password-clicked | Emits and overrides when forgot password button is clicked | **<sign-ip>**    |\n" +
      "| create-account-clicked  |  Emits and overrides when create account button is clicked | **<sign-ip>**    |\n" +
      "| sign-up-submit  |  Emits and overrides when sign up button is submitted | **<sign-up>**    |\n" +
      "| have-account-clicked    |  Emits and overrides when have account button is clicked | **<sign-up>**    |\n";

    const over = event => {
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
    return { state, send, slotTable, eventTable, over, error };
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
