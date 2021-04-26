<template>
  <div>
    <sign-in
      :headless="headless"
      v-if="state?.matches('signIn')"
      @sign-in-submit="onSignInSubmitI"
      ref="signInComponent"
    >
      <template #signInSlotI>
        <slot name="sign-in"></slot>
      </template>

      <template #forgot-password-button="{ onForgotPasswordClicked}">
        <slot
          name="sign-in-forgot-password-button"
          :onForgotPasswordClicked="onForgotPasswordClicked"
        />
      </template>

      <template #sign-in-button="{ onSignInSubmit}">
        <slot name="sign-in-button" :onSignInSubmit="onSignInSubmit" />
      </template>

      <template
        #form="{ info, onSignInSubmit, onCreateAccountClicked, onForgotPasswordClicked }"
      >
        <slot
          name="sign-in-form"
          :info="info"
          :onSignInSubmit="onSignInSubmit"
          :onCreateAccountClicked="onCreateAccountClicked"
          :onForgotPasswordClicked="onForgotPasswordClicked"
        ></slot>
      </template>

      <template #heading>
        <slot name="sign-in-heading"></slot>
      </template>

      <template #full-name>
        <slot name="sign-in-full-name"></slot>
      </template>

      <template #footer="{ info, onSignInSubmit, onCreateAccountClicked  }">
        <slot
          name="sign-in-footer"
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
          name="sign-in-additional-fields"
          :onSignInSubmit="onSignInSubmit"
          :onCreateAccountClicked="onCreateAccountClicked"
        >
        </slot>
      </template>
    </sign-in>
    <sign-up
      :headless="headless"
      v-if="state?.matches('signUp')"
      @sign-up-submit="onSignUpSubmitI"
      ref="signUpComponent"
    >
      <template #signup-fields="{info}">
        <slot name="sign-up-fields" :info="info"></slot>
      </template>

      <template #signUpSlotI>
        <slot name="sign-up"></slot>
      </template>

      <template #footer-left="{ onHaveAccountClicked}">
        <slot
          name="sign-up-footer-left"
          :onHaveAccountClicked="onHaveAccountClicked"
        ></slot>
      </template>

      <template #footer-right="{ onSignUpSubmit }">
        <slot
          name="sign-up-footer-right"
          :onSignUpSubmit="onSignUpSubmit"
        ></slot>
      </template>

      <template #footer="{ info, onHaveAccountClicked, onSignUpSubmit }">
        <slot
          name="sign-up-footer"
          :info="info"
          :onHaveAccountClicked="onHaveAccountClicked"
          :onSignUpSubmit="onSignUpSubmit"
        >
        </slot>
      </template>
    </sign-up>
    <div v-if="state?.matches('signIn.rejected')">
      Error! Can't sign in!
    </div>
    <confirm-sign-up
      :headless="headless"
      v-if="state?.matches('confirmSignUp')"
      ref="confirmSignUpComponent"
      @confirm-sign-up-submit="onConfirmSignUpSubmitI"
    >
      <template #confirmSignUpSlotI>
        <slot name="confirm-sign-up"></slot>
      </template>
      <template
        #footer="{ info, onConfirmSignUpSubmit, onBackToSignInClicked  }"
      >
        <slot
          name="sign-in-footer"
          :info="info"
          :onConfirmSignUpSubmit="onConfirmSignUpSubmit"
          :onBackToSignInClicked="onBackToSignInClicked"
        >
        </slot>
      </template>
    </confirm-sign-up>
  </div>

  <slot v-if="state?.matches('authenticated')"></slot>
</template>

<script lang="ts">
import SignIn from "./sign-in.vue";
import SignUp from "./sign-up.vue";
import ConfirmSignUp from "./confirm-sign-up.vue";
import { ref, provide, Ref } from "vue";
import { useAuth } from "../composables/useAuth";

export default {
  inheritAttrs: false,
  components: {
    SignIn,
    SignUp,
    ConfirmSignUp
  },
  props: {
    headless: {
      type: Boolean,
      default: false
    }
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
    onConfirmSignUpSubmitI: (fn) => unknown;
    signInComponent: typeof SignIn;
    signUpComponent: typeof SignUp;
    confirmSignUpComponent: typeof ConfirmSignUp;
  } {
    const { state } = useAuth();
    const signInComponent = ref(null);
    const signUpComponent = ref(null);
    const confirmSignUpComponent = ref(null);

    const currentPage = ref("SIGNIN");

    const onSignInSubmitI = e => {
      if (attrs?.onSignInSubmit) {
        emit("signInSubmit", e);
      } else {
        signInComponent.value.submit(e);
      }
    };

    const onConfirmSignUpSubmitI = e => {
      if (attrs?.onConfirmSignUpSubmit) {
        emit("confirmSignUpSubmit", e);
      } else {
        confirmSignUpComponent.value.submit(e);
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
      onSignUpSubmitI,
      confirmSignUpComponent,
      onConfirmSignUpSubmitI
    };
  }
};
</script>
