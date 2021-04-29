<template>
  <example-wrapper
    :title="'Update Sign In Button Colors'"
    :code="exampleSignIn"
  >
    <div class="css-example">
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
    </div>
  </example-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Authenticator, useAuth } from "@aws-amplify/ui-vue";
import ExampleWrapper from "./example-wrapper.vue";
import { exampleSignIn } from "../utils/code-examples";

export default defineComponent({
  components: {
    Authenticator,
    ExampleWrapper
  },
  setup() {
    const { state, send } = useAuth();

    return {
      state,
      exampleSignIn,
      send
    };
  }
});
</script>

<style>
.css-example
  [data-amplify-authenticator]
  [data-amplify-footer]
  [data-amplify-button]:last-of-type {
  background-color: orange;
  color: purple;
}
</style>
