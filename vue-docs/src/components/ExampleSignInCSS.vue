<template>
  <Example :title="'Update Sign In Button Colors'" :code="code">
    <div class="css-example">
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
    </div>
  </Example>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AmplifyProvider, Authenticator, useAuth } from '@aws-amplify/ui-vue';
import Example from './Example.vue';

export default defineComponent({
  components: {
    AmplifyProvider,
    Authenticator,
    Example
  },
  setup() {
    const { state, send } = useAuth();

    const code = `
    <div class="css-example">
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
    </div>

    <style>
      .css-example
        [data-amplify-theme]
        [data-amplify-authenticator]
        [data-amplify-footer]
        [data-amplify-button]:last-of-type {
        background-color: orange;
        color: purple;
      }
    </style>

    `;
    return {
      state,
      code,
      send
    };
  }
});
</script>

<style>
.css-example
  [data-amplify-theme]
  [data-amplify-authenticator]
  [data-amplify-footer]
  [data-amplify-button]:last-of-type {
  background-color: orange;
  color: purple;
}
</style>
