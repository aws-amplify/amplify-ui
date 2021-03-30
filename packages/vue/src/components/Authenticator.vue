<template>
  <div data-spark-authenticator="">
    <SignIn v-if="state?.matches('signIn')">
      <template #signInSlotI="{ resetPasswordClicked }">
        <slot
          name="sign-in"
          :resetPasswordClicked="resetPasswordClicked"
        ></slot>
      </template>
      <template #forgot-password-button>
        <slot name="sign-in-forgot-password-button" />
      </template>
      <template #sign-in-button>
        <slot name="sign-in-sign-in-button" />
      </template>
    </SignIn>
    <SignUp v-if="state?.matches('signUp')" />
    <div v-if="state?.matches('signIn.rejected')">
      Error! Can't sign in!
    </div>
  </div>

  <slot v-if="state?.matches('authenticated')"></slot>
</template>

<script lang="ts">
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";
import { ref, provide } from "vue";
import { useAuth } from "../composables/useAuth";

export default {
  components: {
    SignIn,
    SignUp
  },
  setup() {
    const { state, send } = useAuth();

    const currentPage = ref("SIGNIN");
    provide("pageInfo", currentPage);

    return { currentPage, state, send };
  }
};
</script>

<style scoped></style>
