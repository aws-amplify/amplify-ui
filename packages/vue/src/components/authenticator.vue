<template>
  <div
    v-bind="$attrs"
    data-amplify-authenticator
    v-if="!state?.matches('authenticated')"
  >
    <div data-amplify-modal v-if="variationModal" />
    <div data-amplify-container>
      <base-two-tabs
        v-if="actorState?.matches('signIn') || actorState?.matches('signUp')"
      >
        <base-two-tab-item
          :active="actorState?.matches('signIn')"
          :id="44472"
          :label="createAccountLabel"
          @click="send('SIGN_IN')"
        />
        <base-two-tab-item
          :active="actorState?.matches('signUp')"
          :id="44471"
          :label="signInLabel"
          @click="send('SIGN_UP')"
        />
      </base-two-tabs>
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

        <template
          #additional-fields="{ onSignInSubmit, onCreateAccountClicked }"
        >
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

        <template #footer="{ onHaveAccountClicked, onSignUpSubmit, info }">
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
        ref="confirmSignUpComponent"
      >
        <template #confirmSignUpSlotI>
          <slot name="confirm-sign-up"></slot>
        </template>
        <template #footer="{ info, onConfirmSignUpSubmit }">
          <slot
            name="sign-in-footer"
            :info="info"
            :onConfirmSignUpSubmit="onConfirmSignUpSubmit"
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
        <template #footer="{ info, onConfirmResetPasswordSubmit }">
          <slot
            name="sign-in-footer"
            :info="info"
            :onConfirmResetPasswordSubmit="onConfirmResetPasswordSubmit"
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
  </div>

  <slot
    v-if="state?.matches('authenticated')"
    :user="user"
    :state="state"
    :signOut="signOut"
    :send="send"
  ></slot>
</template>

<script setup lang="ts">
import { ref, provide, computed, useAttrs, watch, onBeforeMount } from 'vue';
import { getActorState, getServiceFacade, translations } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import {
  AuthenticatorMachineOptions,
  createAuthenticatorMachine,
} from '@aws-amplify/ui';
import { useActor, useInterpret } from '@xstate/vue';

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

import { CREATE_ACCOUNT_LABEL, SIGN_IN_LABEL } from '../defaults/DefaultTexts';

import {
  InterpretServiceInjectionKeyTypes,
  InterpretService,
} from '../types/index';

onBeforeMount(() => {
  I18n.putVocabularies(translations);
});

const attrs = useAttrs();

const { initialState, loginMechanisms, variation } = withDefaults(
  defineProps<{
    initialState?: AuthenticatorMachineOptions['initialState'];
    loginMechanisms?: AuthenticatorMachineOptions['loginMechanisms'];
    variation?: string;
  }>(),
  {
    loginMechanisms: () => ['username'],
    variation: '',
  }
);

const emit = defineEmits([
  'signInSubmit',
  'confirmSignUpSubmit',
  'resetPasswordSubmit',
  'confirmResetPasswordSubmit',
  'confirmSignInSubmit',
  'mSetupTOTPSubmit',
  'forceNewPasswordSubmit',
  'signUpSubmit',
  'verifyUserSubmit',
  'confirmVerifyUserSubmit',
]);

const machine = createAuthenticatorMachine({ initialState, loginMechanisms });

const service = useInterpret(machine, {
  devTools: process.env.NODE_ENV === 'development',
});

const { state, send } = useActor(service);
provide(InterpretServiceInjectionKeyTypes, <InterpretService>service);

const actorState = computed(() => getActorState(state.value));
const variationModal = computed(() => variation === 'modal');

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

// computed

const signInLabel = computed(() => I18n.get(CREATE_ACCOUNT_LABEL));
const createAccountLabel = computed(() => I18n.get(SIGN_IN_LABEL));

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

// watchers

/**
 * Update service facade when context updates
 */

const user = ref(null);
const signOut = ref(null);

watch(
  () => state.value.context,
  () => {
    const { user: u, signOut: s } = getServiceFacade({
      send,
      state: state.value,
    });
    user.value = u;
    signOut.value = s;
  }
);
</script>
