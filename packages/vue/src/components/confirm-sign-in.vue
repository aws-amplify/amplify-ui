<template>
  <slot v-bind="$attrs" name="confirmSignInSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-confirmsignin
        @submit.prevent="onConfirmSignInSubmit"
      >
        <base-field-set
          class="amplify-flex"
          style="flex-direction: column"
          :disabled="actorState.matches('confirmSignIn.pending')"
        >
          <base-heading :level="3" class="amplify-heading">
            {{ confirmSignInHeading }}
          </base-heading>
          <base-wrapper class="amplify-flex" style="flex-direction: column">
            <base-wrapper
              class="amplify-flex amplify-field amplify-textfield"
              style="flex-direction: column"
            >
              <base-label
                class="amplify-label sr-only"
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
            <template #footert="{ slotData }">
              <slot
                name="footer"
                :info="slotData"
                :onBackToSignInClicked="onBackToSignInClicked"
                :onConfirmSignInSubmit="onConfirmSignInSubmit"
              >
              </slot>
            </template>
            <base-alert v-if="actorState?.context?.remoteError">
              {{ actorState?.context?.remoteError }}
            </base-alert>
            <base-button
              class="amplify-button amplify-field-group__control"
              data-fullwidth="false"
              data-loading="false"
              data-variation="primary"
              style="font-weight: normal"
              :disabled="actorState.matches('confirmSignIn.pending')"
              >{{ confirmText }}</base-button
            >
            <base-button
              class="amplify-button amplify-field-group__control"
              data-fullwidth="false"
              data-size="small"
              data-variation="link"
              style="font-weight: normal"
              type="button"
              @click.prevent="onBackToSignInClicked"
            >
              {{ backSignInText }}</base-button
            >
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
const actorState: ComputedRef<SignInState> = computed(() =>
  getActorState(state.value)
);
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
const onConfirmSignInSubmit = (e: Event): void => {
  if (attrs?.onConfirmSignInSubmit) {
    emit('confirmSignInSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e): void => {
  const formData = new FormData(e.target);
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
