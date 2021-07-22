<template>
  <div>
    <sign-in
      v-if="state?.matches('signIn')"
      @sign-in-submit="onSignInSubmitI"
      ref="signInComponent"
    >
      <template #signInSlotI>
        <slot name="sign-in"></slot>
      </template>

      <template #forgot-password-section="{ onForgotPasswordClicked }">
        <slot
          name="sign-in-forgot-password-section"
          :onForgotPasswordClicked="onForgotPasswordClicked"
        />
      </template>

      <template #sign-in-button="{ onSignInSubmit }">
        <slot name="sign-in-button" :onSignInSubmit="onSignInSubmit" />
      </template>

      <template
        #form="{
          info,
          onSignInSubmit,
          onCreateAccountClicked,
          onForgotPasswordClicked,
        }"
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

      <template #name>
        <slot name="sign-in-name"></slot>
      </template>

      <template #footer="{ info, onSignInSubmit, onCreateAccountClicked }">
        <slot
          name="sign-in-footer"
          :info="info"
          :onSignInSubmit="onSignInSubmit"
          :onCreateAccountClicked="onCreateAccountClicked"
        >
        </slot>
      </template>

      <template #additional-fields="{ onSignInSubmit, onCreateAccountClicked }">
        <slot
          name="sign-in-additional-fields"
          :onSignInSubmit="onSignInSubmit"
          :onCreateAccountClicked="onCreateAccountClicked"
        >
        </slot>
      </template>
      <template #signin-fields="{ info }">
        <slot name="sign-in-fields" :info="info"></slot>
      </template>
    </sign-in>
    <sign-up
      v-if="state?.matches('signUp')"
      @sign-up-submit="onSignUpSubmitI"
      ref="signUpComponent"
    >
      <template #signup-fields="{ info }">
        <slot name="sign-up-fields" :info="info"></slot>
      </template>

      <template #signUpSlotI>
        <slot name="sign-up"></slot>
      </template>

      <template #footer-left="{ onHaveAccountClicked }">
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
    <div v-if="state?.matches('signIn.rejected')">Error! Can't sign in!</div>
    <confirm-sign-up
      v-if="state?.matches('confirmSignUp')"
      @confirm-sign-up-submit="onConfirmSignUpSubmitI"
      ref="confirmSignUpComponent"
    >
      <template #confirmSignUpSlotI>
        <slot name="confirm-sign-up"></slot>
      </template>
      <template
        #footer="{ info, onConfirmSignUpSubmit, onBackToSignInClicked }"
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

    <confirm-sign-in
      v-if="state?.matches('confirmSignIn')"
      @confirm-sign-in-submit="onConfirmSignInSubmitI"
      ref="confirmSignInComponent"
    >
      <template #confirmSignInSlotI>
        <slot name="confirm-sign-in"></slot>
      </template>
      <template
        #footer="{ info, onConfirmSignInSubmit, onBackToSignInClicked }"
      >
        <slot
          name="sign-in-footer"
          :info="info"
          :onConfirmSignInSubmit="onConfirmSignInSubmit"
          :onBackToSignInClicked="onBackToSignInClicked"
        >
        </slot>
      </template>
    </confirm-sign-in>

    <setup-totp
      v-if="state?.matches('setupTOTP')"
      @confirm-setup-totp-submit="onConfirmSetupTOTPSubmitI"
      ref="confirmSetupTOTPComponent"
    >
      <template #confirmSetupTOTPI>
        <slot name="confirm-setup-totp"></slot>
      </template>
      <template #footer="{ info, onSetupTOTPSubmit, onBackToSignInClicked }">
        <slot
          name="sign-in-footer"
          :info="info"
          :onSetupTOTPSubmit="onSetupTOTPSubmit"
          :onBackToSignInClicked="onBackToSignInClicked"
        >
        </slot>
      </template>
    </setup-totp>
  </div>

  <slot
    v-if="state?.matches('authenticated')"
    :user="state?.context?.user"
  ></slot>
</template>

<script lang="ts">
import { ref, provide } from 'vue';

import SignIn from './sign-in.vue';
import SignUp from './sign-up.vue';
import ConfirmSignUp from './confirm-sign-up.vue';
import ConfirmSignIn from './confirm-sign-in.vue';
import SetupTotp from './setup-totp.vue';

import { useAuth } from '../composables/useAuth';
import {
  AuthenticatorSetupReturnTypes,
  SetupEventContext,
} from '../types/index';

export default {
  inheritAttrs: false,
  components: {
    SignIn,
    SignUp,
    ConfirmSignUp,
    ConfirmSignIn,
    SetupTotp,
  },
  setup(
    _,
    { attrs, emit }: SetupEventContext
  ): AuthenticatorSetupReturnTypes & {
    signInComponent: typeof SignIn;
    signUpComponent: typeof SignUp;
    confirmSignUpComponent: typeof ConfirmSignUp;
    confirmSignInComponent: typeof ConfirmSignIn;
    confirmSetupTOTPComponent: typeof SetupTotp;
  } {
    const { state, send } = useAuth();
    const signInComponent = ref(null);
    const signUpComponent = ref(null);
    const confirmSignUpComponent = ref(null);
    const confirmSignInComponent = ref(null);
    const confirmSetupTOTPComponent = ref(null);

    const currentPage = ref('SIGNIN');

    //methods

    const onSignInSubmitI = (e: Event) => {
      if (attrs?.onSignInSubmit) {
        emit('signInSubmit', e);
      } else {
        signInComponent.value.submit(e);
      }
    };

    const onConfirmSignUpSubmitI = (e: Event) => {
      if (attrs?.onConfirmSignUpSubmit) {
        emit('confirmSignUpSubmit', e);
      } else {
        confirmSignUpComponent.value.submit(e);
      }
    };

    const onConfirmSignInSubmitI = (e: Event) => {
      if (attrs?.onConfirmSignInSubmit) {
        emit('confirmSignInSubmit', e);
      } else {
        confirmSignInComponent.value.submit(e);
      }
    };

    const onConfirmSetupTOTPSubmitI = (e: Event) => {
      if (attrs?.onConfirmSetupTOTPSubmit) {
        emit('confirmSetupTOTPSubmit', e);
      } else {
        confirmSetupTOTPComponent.value.submit(e);
      }
    };

    const onSignUpSubmitI = (e: Event) => {
      if (attrs?.onSignUpSubmit) {
        emit('signUpSubmit', e);
      } else {
        signUpComponent.value.submit(e);
      }
    };
    provide('pageInfo', currentPage);

    return {
      currentPage,
      state,
      onSignInSubmitI,
      signInComponent,
      signUpComponent,
      onSignUpSubmitI,
      confirmSignUpComponent,
      confirmSignInComponent,
      confirmSetupTOTPComponent,
      onConfirmSignInSubmitI,
      onConfirmSignUpSubmitI,
      onConfirmSetupTOTPSubmitI,
      send,
    };
  },
};
</script>
