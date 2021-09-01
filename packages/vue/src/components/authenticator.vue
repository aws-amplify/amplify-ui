<template>
  <div>
    <sign-in
      v-if="actorState?.matches('signIn')"
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
      v-if="actorState?.matches('signUp')"
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
    <div v-if="actorState?.matches('signIn.rejected')">
      Error! Can't sign in!
    </div>

    <confirm-sign-up
      v-if="actorState?.matches('confirmSignUp')"
      @confirm-sign-up-submit="onConfirmSignUpSubmitI"
      :shouldHideReturnBtn="shouldHideReturnBtn"
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

    <reset-password
      v-if="actorState?.matches('resetPassword')"
      @reset-password-submit="onResetPasswordSubmitI"
      ref="resetPasswordComponent"
    >
      <template #resetPasswordSlotI>
        <slot name="reset-password"></slot>
      </template>
      <template
        #footer="{ info, onResetPasswordSubmit, onBackToSignInClicked }"
      >
        <slot
          name="sign-in-footer"
          :info="info"
          :onResetPasswordSubmit="onResetPasswordSubmit"
          :onBackToSignInClicked="onBackToSignInClicked"
        >
        </slot>
      </template>
    </reset-password>

    <confirm-reset-password
      v-if="actorState?.matches('confirmResetPassword')"
      @confirm-reset-password-submit="onConfirmResetPasswordSubmitI"
      ref="confirmResetPasswordComponent"
    >
      <template #confirmResetPasswordSlotI>
        <slot name="confirm-reset-password"></slot>
      </template>
      <template
        #footer="{ info, onConfirmResetPasswordSubmit, onBackToSignInClicked }"
      >
        <slot
          name="sign-in-footer"
          :info="info"
          :onConfirmResetPasswordSubmit="onConfirmResetPasswordSubmit"
          :onBackToSignInClicked="onBackToSignInClicked"
        >
        </slot>
      </template>
    </confirm-reset-password>

    <confirm-sign-in
      v-if="actorState?.matches('confirmSignIn')"
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
      v-if="actorState?.matches('setupTOTP')"
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

    <force-new-password
      v-if="actorState?.matches('forceNewPassword')"
      @force-new-password-submit="onForceNewPasswordSubmitI"
      ref="forceNewPasswordComponent"
    >
      <template #forceNewPasswordI>
        <slot name="force-new-password"></slot>
      </template>
      <template
        #footer="{ info, onHaveAccountClicked, onForceNewPasswordSubmit }"
      >
        <slot
          name="sign-in-footer"
          :info="info"
          :onForceNewPasswordSubmit="onForceNewPasswordSubmit"
          :onBackToSignInClicked="onHaveAccountClicked"
        >
        </slot>
      </template>
    </force-new-password>

    <verify-user
      v-if="actorState?.matches('verifyUser')"
      @verify-user-submit="onVerifyUserSubmitI"
      ref="verifyUserComponent"
    >
      <template #verifyUserSlotI>
        <slot name="verify-user"></slot>
      </template>
      <template #footer="{ info, onVerifyUserSubmit, onSkipClicked }">
        <slot
          name="sign-in-footer"
          :info="info"
          :onVerifyUserSubmit="onVerifyUserSubmit"
          :onSkipClicked="onSkipClicked"
        >
        </slot>
      </template>
    </verify-user>

    <confirm-verify-user
      v-if="actorState?.matches('confirmVerifyUser')"
      @confirm-verify-user-submit="onConfirmVerifyUserSubmitI"
      ref="confirmVerifyUserComponent"
    >
      <template #confirmVerifyUserSlotI>
        <slot name="confirm-verify-user"></slot>
      </template>
      <template #footer="{ info, onConfirmVerifyUserSubmit, onSkipClicked }">
        <slot
          name="sign-in-footer"
          :info="info"
          :onConfirmVerifyUserSubmit="onConfirmVerifyUserSubmit"
          :onSkipClicked="onSkipClicked"
        >
        </slot>
      </template>
    </confirm-verify-user>
  </div>

  <slot
    v-if="state?.matches('authenticated')"
    :user="state?.context?.user"
  ></slot>
</template>

<script lang="ts">
import { ref, provide, defineComponent, computed } from 'vue';
import { getActorState } from '@aws-amplify/ui';

import SignIn from './sign-in.vue';
import SignUp from './sign-up.vue';
import ConfirmSignUp from './confirm-sign-up.vue';
import ConfirmSignIn from './confirm-sign-in.vue';
import SetupTotp from './setup-totp.vue';
import ForceNewPassword from './force-new-password.vue';
import ResetPassword from './reset-password.vue';
import ConfirmResetPassword from './confirm-reset-password.vue';
import VerifyUser from './verify-user.vue';
import ConfirmVerifyUser from './confirm-verify-user.vue';

import { useAuth } from '../composables/useAuth';
import {
  AuthenticatorSetupReturnTypes,
  SetupEventContext,
} from '../types/index';

export default defineComponent({
  inheritAttrs: false,
  components: {
    SignIn,
    SignUp,
    ConfirmSignUp,
    ConfirmSignIn,
    SetupTotp,
    ForceNewPassword,
    ResetPassword,
    ConfirmResetPassword,
    VerifyUser,
    ConfirmVerifyUser,
  },
  props: {
    shouldHideReturnBtn: {
      default: true,
      type: Boolean,
    },
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
    forceNewPasswordComponent: typeof ForceNewPassword;
    resetPasswordComponent: typeof ResetPassword;
    confirmResetPasswordComponent: typeof ConfirmResetPassword;
    verifyUserComponent: typeof VerifyUser;
    confirmVerifyUserComponent: typeof ConfirmVerifyUser;
  } {
    const { state, send } = useAuth();
    const actorState = computed(() => getActorState(state.value));
    const signInComponent = ref(null);
    const signUpComponent = ref(null);
    const confirmSignUpComponent = ref(null);
    const confirmSignInComponent = ref(null);
    const confirmSetupTOTPComponent = ref(null);
    const forceNewPasswordComponent = ref(null);
    const resetPasswordComponent = ref(null);
    const confirmResetPasswordComponent = ref(null);
    const verifyUserComponent = ref(null);
    const confirmVerifyUserComponent = ref(null);

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

    const onResetPasswordSubmitI = (e: Event) => {
      if (attrs?.onResetPasswordSubmit) {
        emit('resetPasswordSubmit', e);
      } else {
        resetPasswordComponent.value.submit(e);
      }
    };

    const onConfirmResetPasswordSubmitI = (e: Event) => {
      if (attrs?.onConfirmResetPasswordSubmit) {
        emit('confirmResetPasswordSubmit', e);
      } else {
        confirmResetPasswordComponent.value.submit(e);
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
      if (attrs?.onForceNewPasswordSubmit) {
        emit('mSetupTOTPSubmit', e);
      } else {
        confirmSetupTOTPComponent.value.submit(e);
      }
    };

    const onForceNewPasswordSubmitI = (e: Event) => {
      if (attrs?.onForceNewPasswordSubmit) {
        emit('forceNewPasswordSubmit', e);
      } else {
        forceNewPasswordComponent.value.submit(e);
      }
    };

    const onSignUpSubmitI = (e: Event) => {
      if (attrs?.onSignUpSubmit) {
        emit('signUpSubmit', e);
      } else {
        signUpComponent.value.submit(e);
      }
    };

    const onVerifyUserSubmitI = (e: Event) => {
      if (attrs?.onVerifyUserSubmit) {
        emit('verifyUserSubmit', e);
      } else {
        verifyUserComponent.value.submit(e);
      }
    };

    const onConfirmVerifyUserSubmitI = (e: Event) => {
      if (attrs?.onConfirmVerifyUserSubmit) {
        emit('confirmVerifyUserSubmit', e);
      } else {
        confirmVerifyUserComponent.value.submit(e);
      }
    };

    provide('pageInfo', currentPage);

    return {
      currentPage,
      state,
      actorState,
      onSignInSubmitI,
      signInComponent,
      signUpComponent,
      forceNewPasswordComponent,
      onSignUpSubmitI,
      confirmSignUpComponent,
      confirmSignInComponent,
      confirmSetupTOTPComponent,
      resetPasswordComponent,
      confirmResetPasswordComponent,
      verifyUserComponent,
      confirmVerifyUserComponent,
      onConfirmSignInSubmitI,
      onResetPasswordSubmitI,
      onConfirmSignUpSubmitI,
      onConfirmSetupTOTPSubmitI,
      onForceNewPasswordSubmitI,
      onConfirmResetPasswordSubmitI,
      onVerifyUserSubmitI,
      onConfirmVerifyUserSubmitI,
      send,
    };
  },
});
</script>
