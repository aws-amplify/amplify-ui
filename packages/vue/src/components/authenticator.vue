<script setup lang="ts">
import {
  ref,
  toRefs,
  computed,
  onMounted,
  onUnmounted,
  withDefaults,
} from 'vue';

import {
  AuthFormFields,
  AuthenticatorMachineOptions,
  AuthenticatorRoute,
  SocialProvider,
  authenticatorTextUtil,
  setUserAgent,
} from '@aws-amplify/ui';

import { useAuth, useAuthenticator } from '../composables/useAuth';
import { UseAuthenticator } from '../types';
import { VERSION } from '../version';

import SignIn from './sign-in.vue';
import SignUp from './sign-up.vue';
import ConfirmSignUp from './confirm-sign-up.vue';
import ConfirmSignIn from './confirm-sign-in.vue';
import SetupTotp from './setup-totp.vue';
import ForceNewPassword from './force-new-password.vue';
import ForgotPassword from './forgot-password.vue';
import ConfirmResetPassword from './confirm-reset-password.vue';
import VerifyUser from './verify-user.vue';
import ConfirmVerifyUser from './confirm-verify-user.vue';

interface AuthenticatorProps {
  hideSignUp?: boolean;
  initialState?: AuthenticatorMachineOptions['initialState'];
  loginMechanisms?: AuthenticatorMachineOptions['loginMechanisms'];
  services?: AuthenticatorMachineOptions['services'];
  signUpAttributes?: AuthenticatorMachineOptions['signUpAttributes'];
  variation?: 'default' | 'modal';
  socialProviders?: SocialProvider[];
  formFields?: AuthFormFields;
}

const props = withDefaults(defineProps<AuthenticatorProps>(), {
  variation: 'default',
});

const {
  initialState,
  loginMechanisms,
  variation,
  services,
  signUpAttributes,
  socialProviders,
  hideSignUp,
  formFields,
} = toRefs(props);

let clearUserAgent: () => void;

const hasInitialized = ref(false);

const { service, send, state } = useAuth();

/**
 * Subscribes to state machine changes and sends INIT event
 * once machine reaches 'setup' state.
 */
const unsubscribeMachine = service.subscribe((newState) => {
  if (newState.matches('setup') && !hasInitialized.value) {
    send({
      type: 'INIT',
      data: {
        /**
         * There's a type inference bug with prop refs that incorrectly assume
         * they can be undefined. Adding `!` until this is resolved from Vue's end.
         *
         * https://github.com/vuejs/core/issues/6420
         */
        initialState: initialState!.value,
        loginMechanisms: loginMechanisms!.value,
        socialProviders: socialProviders!.value,
        signUpAttributes: signUpAttributes!.value,
        services: services!.value,
        formFields: formFields!.value,
      },
    });
    hasInitialized.value = true;
  }
}).unsubscribe;

// `facade` is manually typed to `UseAuthenticator` for temporary type safety.
const facade: UseAuthenticator = useAuthenticator();
const { route, signOut, toSignIn, toSignUp, user } = toRefs(facade);

onMounted(() => {
  clearUserAgent = setUserAgent({
    componentName: 'Authenticator',
    packageName: 'vue',
    version: VERSION,
  });
});

onUnmounted(() => {
  clearUserAgent();
  unsubscribeMachine();
});

const signInComponent = ref();
const signUpComponent = ref();
const confirmSignUpComponent = ref();
const confirmSignInComponent = ref();
const confirmSetupTotpComponent = ref();
const forceNewPasswordComponent = ref();
const ForgotPasswordComponent = ref();
const confirmResetPasswordComponent = ref();
const verifyUserComponent = ref();
const confirmVerifyUserComponent = ref();

// text util
const { getSignInTabText, getSignUpTabText } = authenticatorTextUtil;

// computed
const signInLabel = computed(() => getSignInTabText());
const createAccountLabel = computed(() => getSignUpTabText());

// methods
const hasTabs = computed(() => {
  return route.value === 'signIn' || route.value === 'signUp';
});

const hasRouteComponent = computed(() => {
  const routesWithComponent: AuthenticatorRoute[] = [
    'confirmResetPassword',
    'confirmSignIn',
    'confirmSignUp',
    'confirmVerifyUser',
    'forceNewPassword',
    'forgotPassword',
    'setupTotp',
    'signIn',
    'signUp',
    'verifyUser',
  ];
  return routesWithComponent.includes(route.value);
});
</script>

<template>
  <div
    v-bind="$attrs"
    data-amplify-authenticator
    :data-variation="variation"
    v-if="hasRouteComponent"
  >
    <div data-amplify-container>
      <slot name="header"> </slot>
      <div
        data-amplify-router
        :data-amplify-router-content="hasTabs ? undefined : ''"
      >
        <base-two-tabs v-if="hasTabs && !hideSignUp">
          <base-two-tab-item
            :active="route === 'signIn'"
            id="signIn"
            :label="signInLabel"
            @click="toSignIn"
          />
          <base-two-tab-item
            :active="route === 'signUp'"
            id="signUp"
            :label="createAccountLabel"
            @click="toSignUp"
          />
        </base-two-tabs>
        <div v-if="hasTabs" data-amplify-router-content>
          <sign-in
            id="signIn-panel"
            role="tabpanel"
            class="amplify-tabs__panel amplify-tabs__panel--active"
            aria-labelledby="signIn-tab"
            v-if="route === 'signIn'"
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
            id="signUp-panel"
            class="amplify-tabs__panel amplify-tabs__panel--active"
            role="tabpanel"
            aria-labelledby="signUp-tab"
            v-if="route === 'signUp' && !hideSignUp"
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
          v-if="route === 'confirmSignUp'"
          ref="confirmSignUpComponent"
        >
          <template #confirmSignUpSlotI>
            <slot name="confirm-sign-up"></slot>
          </template>
          <template #header>
            <slot name="confirm-sign-up-header"></slot>
          </template>
          <template #footer>
            <slot name="confirm-sign-up-footer"> </slot>
          </template>
        </confirm-sign-up>

        <forgot-password
          v-if="route === 'forgotPassword'"
          ref="ForgotPasswordComponent"
        >
          <template #forgotPasswordSlotI>
            <slot name="forgot-password"></slot>
          </template>
          <template #header>
            <slot name="forgot-password-header"></slot>
          </template>
          <template #footer>
            <slot name="forgot-password-footer"> </slot>
          </template>
        </forgot-password>

        <confirm-reset-password
          v-if="route === 'confirmResetPassword'"
          ref="confirmResetPasswordComponent"
        >
          <template #confirmResetPasswordSlotI>
            <slot name="confirm-reset-password"></slot>
          </template>
          <template #header>
            <slot name="confirm-reset-password-header"></slot>
          </template>
          <template #footer>
            <slot name="confirm-reset-password-footer"> </slot>
          </template>
        </confirm-reset-password>

        <confirm-sign-in
          v-if="route === 'confirmSignIn'"
          ref="confirmSignInComponent"
        >
          <template #confirmSignInSlotI>
            <slot name="confirm-sign-in"></slot>
          </template>
          <template #header>
            <slot name="confirm-sign-in-header"></slot>
          </template>
          <template #footer>
            <slot name="confirm-sign-in-footer"> </slot>
          </template>
        </confirm-sign-in>

        <setup-totp
          v-if="route === 'setupTotp'"
          ref="confirmSetupTotpComponent"
        >
          <template #confirmSetupTotpI>
            <slot name="setup-totp"></slot>
          </template>
          <template #header>
            <slot name="setup-totp-header"></slot>
          </template>
          <template #footer>
            <slot name="setup-totp-footer"> </slot>
          </template>
        </setup-totp>

        <force-new-password
          v-if="route === 'forceNewPassword'"
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
          <template #footer>
            <slot name="force-new-password-footer"> </slot>
          </template>
        </force-new-password>

        <verify-user v-if="route === 'verifyUser'" ref="verifyUserComponent">
          <template #verifyUserSlotI>
            <slot name="verify-user"></slot>
          </template>
          <template #header>
            <slot name="verify-user-header"></slot>
          </template>
          <template #footer>
            <slot name="verify-user-footer"> </slot>
          </template>
        </verify-user>

        <confirm-verify-user
          v-if="route === 'confirmVerifyUser'"
          ref="confirmVerifyUserComponent"
        >
          <template #confirmVerifyUserSlotI>
            <slot name="confirm-verify-user"></slot>
          </template>
          <template #header>
            <slot name="confirm-verify-user-header"></slot>
          </template>
          <template #footer>
            <slot name="confirm-verify-user-footer"> </slot>
          </template>
        </confirm-verify-user>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
  <!-- cast slot props back to any for backwards compatibility -->
  <slot
    v-if="route === 'authenticated'"
    :user="user as any"
    :state="state as any"
    :signOut="signOut as any"
    :send="send as any"
  ></slot>
</template>
