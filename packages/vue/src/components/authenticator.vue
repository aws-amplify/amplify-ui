<script setup lang="ts">
import { useAuth } from '../composables/useAuth';
import {
  ref,
  computed,
  useAttrs,
  watch,
  Ref,
  onMounted,
  onUnmounted,
} from 'vue';
import { useActor, useInterpret } from '@xstate/vue';
import {
  getActorState,
  getServiceFacade,
  AuthenticatorMachineOptions,
  createAuthenticatorMachine,
  translate,
  CognitoUserAmplify,
  SocialProvider,
  listenToAuthHub,
  AuthFormFields,
} from '@aws-amplify/ui';

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

const attrs = useAttrs();

const {
  initialState,
  loginMechanisms,
  variation,
  services,
  signUpAttributes,
  socialProviders,
  hideSignUp,
  formFields,
} = withDefaults(
  defineProps<{
    hideSignUp?: boolean;
    initialState?: AuthenticatorMachineOptions['initialState'];
    loginMechanisms?: AuthenticatorMachineOptions['loginMechanisms'];
    services?: AuthenticatorMachineOptions['services'];
    signUpAttributes?: AuthenticatorMachineOptions['signUpAttributes'];
    variation?: 'default' | 'modal';
    socialProviders?: SocialProvider[];
    formFields?: AuthFormFields;
  }>(),
  {
    variation: 'default',
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
const machine = createAuthenticatorMachine();

const service = useInterpret(machine);
let unsubscribeHub: ReturnType<typeof listenToAuthHub>;

const { state, send } = useActor(service);
useAuth(service);

const hasInitialized = ref(false);

service.subscribe((newState) => {
  if (newState.matches('setup')) {
    if (!hasInitialized.value) {
      send({
        type: 'INIT',
        data: {
          initialState,
          loginMechanisms,
          socialProviders,
          signUpAttributes,
          services,
          formFields,
        },
      });
      hasInitialized.value = true;
    }
  }
});

onMounted(() => {
  unsubscribeHub = listenToAuthHub(send);
});

onUnmounted(() => {
  if (unsubscribeHub) unsubscribeHub();
});

const actorState = computed(() => getActorState(state.value));

const signInComponent = ref();
const signUpComponent = ref();
const confirmSignUpComponent = ref();
const confirmSignInComponent = ref();
const confirmSetupTOTPComponent = ref();
const forceNewPasswordComponent = ref();
const resetPasswordComponent = ref();
const confirmResetPasswordComponent = ref();
const verifyUserComponent = ref();
const confirmVerifyUserComponent = ref();

// computed

const signInLabel = computed(() => translate('Create Account'));
const createAccountLabel = computed(() => translate('Sign In'));

//methods

const onSignInSubmitI = (e: Event) => {
  if (attrs?.onSignInSubmit) {
    emit('signInSubmit', e);
  } else {
    signInComponent.value?.submit(e);
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
    signUpComponent.value.submit();
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

const user: Ref<CognitoUserAmplify | null> = ref(null);
const signOut = ref();

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

const hasTabs = computed(() => {
  return (
    actorState.value?.matches('signIn') || actorState.value?.matches('signUp')
  );
});
</script>

<template>
  <div
    v-bind="$attrs"
    data-amplify-authenticator
    :data-variation="variation"
    v-if="!state?.matches('authenticated')"
  >
    <div data-amplify-container>
      <slot name="header"> </slot>
      <div
        data-amplify-router
        :data-amplify-router-content="hasTabs ? undefined : ''"
      >
        <base-two-tabs v-if="hasTabs && !hideSignUp">
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
        <div v-if="hasTabs" data-amplify-router-content>
          <sign-in
            v-if="actorState?.matches('signIn')"
            @sign-in-submit="onSignInSubmitI"
            ref="signInComponent"
          >
            <template #signInSlotI>
              <slot name="sign-in"></slot>
            </template>

            <template
              #form="{ info, onSignInSubmit, onForgotPasswordClicked, onInput }"
            >
              <slot
                name="sign-in-form"
                :info="info"
                :onInput="onInput"
                :onSignInSubmit="onSignInSubmit"
                :onForgotPasswordClicked="onForgotPasswordClicked"
              ></slot>
            </template>

            <template #header>
              <slot name="sign-in-header"></slot>
            </template>

            <template #footer>
              <slot name="sign-in-footer"> </slot>
            </template>
          </sign-in>
          <sign-up
            v-if="actorState?.matches('signUp') && !hideSignUp"
            @sign-up-submit="onSignUpSubmitI"
            ref="signUpComponent"
          >
            <template #signUpSlotI>
              <slot name="sign-up"></slot>
            </template>
            <template #header>
              <slot name="sign-up-header"></slot>
            </template>
            <template #signup-fields="{ info }">
              <slot name="sign-up-fields" :info="info"></slot>
            </template>

            <template #footer>
              <slot name="sign-up-footer"> </slot>
            </template>
          </sign-up>
        </div>

        <confirm-sign-up
          v-if="actorState?.matches('confirmSignUp')"
          @confirm-sign-up-submit="onConfirmSignUpSubmitI"
          ref="confirmSignUpComponent"
        >
          <template #confirmSignUpSlotI>
            <slot name="confirm-sign-up"></slot>
          </template>
          <template #header>
            <slot name="confirm-sign-up-header"></slot>
          </template>
          <template #footer="{ onConfirmSignUpSubmit, onLostCodeClicked }">
            <slot
              name="confirm-sign-up-footer"
              :onConfirmSignUpSubmit="onConfirmSignUpSubmit"
              :onLostCodeClicked="onLostCodeClicked"
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
          <template #header>
            <slot name="reset-password-header"></slot>
          </template>
          <template #footer="{ onResetPasswordSubmit, onBackToSignInClicked }">
            <slot
              name="reset-password-footer"
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
          <template #header>
            <slot name="confirm-reset-password-header"></slot>
          </template>
          <template
            #footer="{ onConfirmResetPasswordSubmit, onLostYourCodeClicked }"
          >
            <slot
              name="confirm-reset-password-footer"
              :onConfirmResetPasswordSubmit="onConfirmResetPasswordSubmit"
              :onLostYourCodeClicked="onLostYourCodeClicked"
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
          <template #header>
            <slot name="confirm-sign-in-header"></slot>
          </template>
          <template #footer="{ onConfirmSignInSubmit, onBackToSignInClicked }">
            <slot
              name="confirm-sign-in-footer"
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
            <slot name="setup-totp"></slot>
          </template>
          <template #header>
            <slot name="setup-totp-header"></slot>
          </template>
          <template #footer="{ onSetupTOTPSubmit, onBackToSignInClicked }">
            <slot
              name="setup-totp-footer"
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
          <template #header>
            <slot name="force-new-password-header"></slot>
          </template>
          <template #force-new-password-form-fields>
            <slot name="force-new-password-form-fields"></slot>
          </template>
          <template
            #footer="{ onHaveAccountClicked, onForceNewPasswordSubmit }"
          >
            <slot
              name="force-new-password-footer"
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
          <template #header>
            <slot name="verify-user-header"></slot>
          </template>
          <template #footer="{ onVerifyUserSubmit, onSkipClicked }">
            <slot
              name="verify-user-footer"
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
          <template #header>
            <slot name="confirm-verify-user-header"></slot>
          </template>
          <template #footer="{ onConfirmVerifyUserSubmit, onSkipClicked }">
            <slot
              name="confirm-verify-user-footer"
              :onConfirmVerifyUserSubmit="onConfirmVerifyUserSubmit"
              :onSkipClicked="onSkipClicked"
            >
            </slot>
          </template>
        </confirm-verify-user>
      </div>
      <slot name="footer"></slot>
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
