<template>
  <h1 class="text-5xl mb-10 text-center">
    Spark Authenticator Examples For Vue.js 3
  </h1>
  <aside
    class="p-6 mb-10 shadow-inner bg-gray-100 rounded w-full flex flex-col"
  >
    <div class="w-full text-xl mb-10 ">
      <Prism language="html" :code="defaultExample"> </Prism>
    </div>
    <spark-provider defaults>
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
    </spark-provider>
  </aside>

  <h3 class="text-3xl mb-5">Overriding forgot-password</h3>
  <aside
    class="p-6 mb-10 shadow-inner bg-gray-100 rounded w-full flex flex-col"
  >
    <div class="w-full text-xl mb-10 ">
      <Prism language="html" :code="overrideForgotPassword"> </Prism>
    </div>
    <spark-provider defaults>
      <authenticator>
        <template #sign-in-forgot-password-button>
          <button>New Button</button>
        </template>
      </authenticator>
    </spark-provider>
  </aside>

  <!-- todo refactor to presentational component -->
  <h3 class="text-3xl mb-5">
    Overriding sign-in button
  </h3>
  <aside
    class="p-6 mb-10 shadow-inner bg-gray-100 rounded w-full flex flex-col"
  >
    <div class="w-full text-xl mb-10 ">
      <Prism language="html" :code="overrideSignInButton"> </Prism>
    </div>
    <spark-provider defaults>
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
    </spark-provider>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import Prism from "./components/Prism.vue";

Amplify.configure(aws_exports);
import "@aws-amplify/spark-vue/styles.css";
import { SparkProvider, Authenticator, useAuth } from "@aws-amplify/spark-vue";

export default defineComponent({
  name: "App",
  components: {
    SparkProvider,
    Authenticator,
    Prism
  },
  data: () => ({
    defaultExample: `
  <spark-provider defaults>
    <authenticator> </authenticator>
  </spark-provider>
    `,
    overrideForgotPassword: `
    <spark-provider defaults>
      <authenticator>
        <template #sign-in-forgot-password-button>
          <button>New Button</button>
        </template>
      </authenticator>
    </spark-provider>
    `,
    overrideSignInButton: ` 
    <spark-provider defaults>
      <authenticator>
        <template #sign-in-sign-in-button>
          <button>New Sign In Button</button>
        </template>
      </authenticator>
    </spark-provider>
    `
  }),
  setup() {
    const { state, send } = useAuth();

    return { state, send };
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
</style>
