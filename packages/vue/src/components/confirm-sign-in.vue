<template>
  <slot v-bind="$attrs" name="confirmSignInSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-confirmsignin
        @input="onInput"
        @submit.prevent="onConfirmSignInSubmit"
      >
        <base-field-set
          class="amplify-flex"
          style="flex-direction: column"
          :disabled="actorState.matches('confirmSignIn.pending')"
        >
          <slot name="header">
            <base-heading :level="3" class="amplify-heading">
              {{ confirmSignInHeading }}
            </base-heading>
          </slot>
          <base-wrapper class="amplify-flex" style="flex-direction: column">
            <base-wrapper
              class="amplify-flex amplify-field amplify-textfield"
              style="flex-direction: column"
            >
              <base-label
                class="amplify-visually-hidden amplify-label"
                for="amplify-field-51ee"
              >
                Code *
              </base-label>
              <base-wrapper class="amplify-flex" style="flex-direction: column">
                <base-input
                  class="amplify-input amplify-field-group__control"
                  id="amplify-field-51ee"
                  aria-invalid="false"
                  name="confirmation_code"
                  :placeholder="codeText"
                  autocomplete="one-time-code"
                  required
                  type="text"
                ></base-input>
              </base-wrapper>
            </base-wrapper>
          </base-wrapper>
          <base-footer class="amplify-flex" style="flex-direction: column">
            <base-alert v-if="actorState?.context?.remoteError">
              {{ translate(actorState?.context?.remoteError) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-loading="false"
              data-variation="primary"
              style="font-weight: normal"
              :disabled="actorState.matches('confirmSignIn.pending')"
              >{{ confirmText }}</amplify-button
            >
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-size="small"
              data-variation="link"
              style="font-weight: normal"
              type="button"
              @click.prevent="onBackToSignInClicked"
            >
              {{ backSignInText }}</amplify-button
            >
            <slot
              name="footer"
              :onBackToSignInClicked="onBackToSignInClicked"
              :onConfirmSignInSubmit="onConfirmSignInSubmit"
            >
            </slot>
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script setup lang="ts">
import {
  AuthChallengeNames,
  getActorState,
  SignInState,
  translate,
} from '@aws-amplify/ui';
import { computed, ComputedRef, useAttrs } from 'vue';

import { useAuth } from '../composables/useAuth';

const emit = defineEmits(['confirmSignInSubmit', 'backToSignInClicked']);
const attrs = useAttrs();

const { state, send } = useAuth();
const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<SignInState>;
const challengeName = actorState.value.context.challengeName;

let mfaType: string = 'SMS';

if (challengeName === AuthChallengeNames.SOFTWARE_TOKEN_MFA) {
  mfaType = 'TOTP';
}
const confirmSignInHeading = `Confirm ${mfaType} Code`;

// Computed Properties
const backSignInText = computed(() => translate('Back to Sign In'));
const confirmText = computed(() => translate('Confirm'));
const codeText = computed(() => translate('Code'));

// Methods
const onInput = (e: Event): void => {
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};

const onConfirmSignInSubmit = (e: Event): void => {
  if (attrs?.onConfirmSignInSubmit) {
    emit('confirmSignInSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  const formData = new FormData(<HTMLFormElement>e.target);
  send({
    type: 'SUBMIT',
    //@ts-ignore
    data: {
      //@ts-ignore
      ...Object.fromEntries(formData),
    },
  });
};

const onBackToSignInClicked = (): void => {
  if (attrs?.onBackToSignInClicked) {
    emit('backToSignInClicked');
  } else {
    send({
      type: 'SIGN_IN',
    });
  }
};
</script>
