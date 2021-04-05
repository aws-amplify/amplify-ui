<template>
  <div data-amplify-authenticator="">
    <SignIn v-if="state?.matches('signIn')">
      <template #signInSlotI>
        <slot name="sign-in"></slot>
      </template>

      <template #forgot-password-button="{ onForgotPasswordClicked}">
        <slot
          name="authenticator-si--forgot-password-button"
          :onForgotPasswordClicked="onForgotPasswordClicked"
        />
      </template>

      <template #sign-in-button="{ onSignInSubmit}">
        <slot
          name="authenticator-si--sign-in-button"
          :onSignInSubmit="onSignInSubmit"
        />
      </template>

      <template #form="{ info }">
        <slot name="authenticator-si--form" :info="info"></slot>
      </template>

      <template #heading>
        <slot name="authenticator-si--heading"></slot>
      </template>

      <template #full-name>
        <slot name="authenticator-si--full-name"></slot>
      </template>

      <template #footer="{ info, onSignInSubmit, onCreateAccountClicked  }">
        <slot
          name="authenticator-si--footer"
          :info="info"
          :onSignInSubmit="onSignInSubmit"
          :onCreateAccountClicked="onCreateAccountClicked"
        >
        </slot>
      </template>

      <template
        #additional-fields="{ onSignInSubmit, onCreateAccountClicked  }"
      >
        <slot
          name="authenticator-si--additional-fields"
          :onSignInSubmit="onSignInSubmit"
          :onCreateAccountClicked="onCreateAccountClicked"
        >
        </slot>
      </template>
    </SignIn>
    <SignUp v-if="state?.matches('signUp')">
      <template #additional-fields>
        <slot name="authenticator-su--additional-fields"></slot>
      </template>

      <template #signUpSlotI>
        <slot name="sign-up"></slot>
      </template>

      <template #footer-left="{ onHaveAccountClicked}">
        <slot
          name="authenticator-su--footer-left"
          :onHaveAccountClicked="onHaveAccountClicked"
        ></slot>
      </template>

      <template #footer-right="{ onSignUpSubmit }">
        <slot
          name="authenticator-su--footer-right"
          :onSignInSubmit="onSignUpSubmit"
        ></slot>
      </template>

      <template #footer="{ info, onHaveAccountClicked, onSignUpSubmit }">
        <slot
          name="authenticator-su--footer"
          :info="info"
          :onHaveAccountClicked="onHaveAccountClicked"
          :onSignUpSubmit="onSignUpSubmit"
        >
        </slot>
      </template>
    </SignUp>
    <div v-if="state?.matches('signIn.rejected')">
      Error! Can't sign in!
    </div>
  </div>

  <slot v-if="state?.matches('authenticated')"></slot>
</template>

<script lang="ts">
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";
import { ref, provide, Ref } from "vue";
import { useAuth } from "../composables/useAuth";

export default {
  components: {
    SignIn,
    SignUp
  },
  setup(): { currentPage: Ref<string>; state: Ref } {
    const { state } = useAuth();

    const currentPage = ref("SIGNIN");
    provide("pageInfo", currentPage);

    return { currentPage, state };
  }
};
</script>
