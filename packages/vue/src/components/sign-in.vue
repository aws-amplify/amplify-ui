<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';

import {
  authenticatorTextUtil,
  getActorState,
  getFormDataFromEvent,
  SignInState,
  translate,
} from '@aws-amplify/ui';

import FederatedSignIn from './federated-sign-in.vue';

// @xstate
import { useAuth, useAuthenticator } from '../composables/useAuth';
import BaseFormFields from './primitives/base-form-fields.vue';

const props = useAuthenticator();

const attrs = useAttrs();
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
const signIngButtonText = computed(() => getSigningInText());

const { state, send } = useAuth();
const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<SignInState>;

// Methods

const onInput = (e: Event): void => {
  const { name, value } = e.target as HTMLInputElement;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};

const onSignInSubmit = (e: Event): void => {
  if (attrs?.onSignInSubmit) {
    emit('signInSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  props.submitForm(getFormDataFromEvent(e));
};

const onForgotPasswordClicked = (): void => {
  if (attrs?.onForgotPasswordClicked) {
    emit('forgotPasswordClicked');
  } else {
    send({ type: 'RESET_PASSWORD' });
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
            :disabled="actorState.matches('signIn.submit')"
            class="amplify-flex amplify-authenticator__column"
          >
            <template #fieldSetI="{ slotData }">
              <slot name="signin-fields" :info="slotData"> </slot>
            </template>
            <legend class="amplify-visually-hidden">Sign in</legend>
            <base-form-fields route="signIn"></base-form-fields>
          </base-field-set>
          <base-alert v-if="actorState.context.remoteError">
            {{ translate(actorState.context.remoteError) }}
          </base-alert>

          <amplify-button
            :disabled="actorState.matches('signIn.submit')"
            class="amplify-field-group__control amplify-authenticator__font"
            :fullwidth="true"
            :loading="false"
            :variation="'primary'"
          >
            {{
              actorState.matches('signIn.submit')
                ? signIngButtonText
                : signInButtonText
            }}
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
