<script setup lang="ts">
import { computed, toRefs, useAttrs } from 'vue';

import {
  AuthenticatorServiceFacade,
  authenticatorTextUtil,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';

import FederatedSignIn from './federated-sign-in.vue';

// @xstate
import { useAuthenticator } from '../composables/useAuth';
import BaseFormFields from './primitives/base-form-fields.vue';

// `useAuthenticator` is casted for temporary type safety on this file.
const props = useAuthenticator() as AuthenticatorServiceFacade;
const { submitForm, updateForm, toResetPassword } = props;
const { error, isPending } = toRefs(props);

const attrs = useAttrs();

/** @deprecated Component events are deprecated and not maintained. */
const emit = defineEmits([
  'signInSubmit',
  'forgotPasswordClicked',
  'createAccountClicked',
]);

// Text Util
const { getForgotPasswordText, getSignInText, getSigningInText } =
  authenticatorTextUtil;

// Computed Properties
const forgotYourPasswordLink = computed(() => getForgotPasswordText());
const signInButtonText = computed(() => getSignInText());
const signingInButtonText = computed(() => getSigningInText());

// Methods
const onInput = (e: Event): void => {
  const { name, value } = e.target as HTMLInputElement;
  updateForm({ name, value });
};

const onSignInSubmit = (e: Event): void => {
  // TODO(BREAKING): remove unused emit
  // istanbul ignore next
  if (attrs?.onSignInSubmit) {
    emit('signInSubmit', e);
  } else {
    submitForm(getFormDataFromEvent(e));
  }
};

const onForgotPasswordClicked = (): void => {
  // TODO(BREAKING): remove unused emit
  // istanbul ignore next
  if (attrs?.onForgotPasswordClicked) {
    emit('forgotPasswordClicked');
  } else {
    toResetPassword();
  }
};
</script>

<template>
  <slot v-bind="$attrs" name="signInSlotI">
    <slot name="header"></slot>

    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-signin
        @input="onInput"
        @submit.prevent="onSignInSubmit"
        method="post"
      >
        <template #formt="{ slotData }">
          <slot
            name="form"
            :info="slotData"
            :onSignInSubmit="onSignInSubmit"
            :onInput="onInput"
            :onForgotPasswordClicked="onForgotPasswordClicked"
          >
          </slot>
        </template>
        <federated-sign-in></federated-sign-in>
        <base-wrapper class="amplify-flex amplify-authenticator__column">
          <base-field-set
            :disabled="isPending"
            class="amplify-flex amplify-authenticator__column"
          >
            <template #fieldSetI="{ slotData }">
              <slot name="signin-fields" :info="slotData"> </slot>
            </template>
            <legend class="amplify-visually-hidden">Sign in</legend>
            <base-form-fields route="signIn"></base-form-fields>
          </base-field-set>
          <base-alert v-if="error">
            {{ translate(error) }}
          </base-alert>

          <amplify-button
            :disabled="isPending"
            class="amplify-field-group__control amplify-authenticator__font"
            :fullwidth="true"
            :loading="false"
            :variation="'primary'"
          >
            {{ isPending ? signingInButtonText : signInButtonText }}
          </amplify-button>
        </base-wrapper>
      </base-form>
    </base-wrapper>

    <base-footer>
      <slot name="footer">
        <div data-amplify-footer>
          <amplify-button
            @click="onForgotPasswordClicked"
            class="amplify-field-group__control amplify-authenticator__font"
            :variation="'link'"
            :fullwidth="true"
            :size="'small'"
            style="font-weight: normal"
            type="button"
          >
            {{ forgotYourPasswordLink }}
          </amplify-button>
        </div>
      </slot>
    </base-footer>
  </slot>
</template>
