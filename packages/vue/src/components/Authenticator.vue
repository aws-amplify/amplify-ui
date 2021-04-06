<template>
  <div v-bind="$attrs" data-amplify-authenticator="">
    <SignIn
      v-if="state?.matches('signIn')"
      @sign-in-submit="onSignInSubmitI"
      ref="signInComponent"
    >
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
    <SignUp
      v-if="state?.matches('signUp')"
      @sign-up-submit="onSignUpSubmitI"
      ref="signUpComponent"
    >
      <template #signup-fields="{info}">
        <slot name="authenticator-su--signup-fields" :info="info"></slot>
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
          :onSignUpSubmit="onSignUpSubmit"
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
    <!-- <ConfirmSignUp v-if="state?.matches('signIn')"></ConfirmSignUp> -->
    <ConfirmSignUp v-if="state?.matches('confirmSignUp')"></ConfirmSignUp>
  </div>

  <slot v-if="state?.matches('authenticated')"></slot>
</template>

<script lang="ts">
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";
import ConfirmSignUp from "./ConfirmSignUp.vue";
import { ref, provide, Ref } from "vue";
import { useAuth } from "../composables/useAuth";

export default {
  inheritAttrs: false,
  components: {
    SignIn,
    SignUp,
    ConfirmSignUp
  },
  setup(
    _: unknown,
    {
      attrs,
      emit
    }: {
      emit: (st, e?) => unknown;
      attrs: Record<string, unknown>;
    }
  ): {
    currentPage: Ref<string>;
    state: Ref;
    onSignInSubmitI: (fn) => unknown;
    onSignUpSubmitI: (fn) => unknown;
    signInComponent: typeof SignIn;
    signUpComponent: typeof SignUp;
  } {
    const { state } = useAuth();
    const signInComponent = ref(null);
    const signUpComponent = ref(null);

    const currentPage = ref("SIGNIN");

    const onSignInSubmitI = e => {
      if (attrs?.onSignInSubmit) {
        emit("signInSubmit", e);
      } else {
        signInComponent.value.submit(e);
      }
    };

    const onSignUpSubmitI = e => {
      if (attrs?.onSignUpSubmit) {
        emit("signUpSubmit", e);
      } else {
        signUpComponent.value.submit(e);
      }
    };
    provide("pageInfo", currentPage);

    return {
      currentPage,
      state,
      onSignInSubmitI,
      signInComponent,
      signUpComponent,
      onSignUpSubmitI
    };
  }
};
</script>
