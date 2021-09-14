<template>
  <slot v-bind="$attrs" name="confirmSignInSlotI">
    <base-wrapper v-bind="$attrs" data-amplify-wrapper>
      <base-form
        data-amplify-authenticator-confirmsignin
        @submit.prevent="onConfirmSignInSubmit"
      >
        <base-heading>
          {{ confirmSignInHeading }}
        </base-heading>
        <base-field-set :disabled="actorState.matches('confirmSignIn.pending')">
          <base-label data-amplify-password>
            <base-text>Code *</base-text>
            <base-input
              name="confirmation_code"
              :placeholder="codeText"
              autocomplete="one-time-code"
              required
              type="text"
            ></base-input>
          </base-label>
        </base-field-set>

        <base-footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onBackToSignInClicked="onBackToSignInClicked"
              :onConfirmSignInSubmit="onConfirmSignInSubmit"
            >
            </slot>
          </template>
          <base-button type="button" @click.prevent="onBackToSignInClicked">
            {{ backSignInText }}</base-button
          >
          <base-spacer />
          <base-button
            :disabled="actorState.matches('confirmSignIn.pending')"
            >{{ confirmText }}</base-button
          >
        </base-footer>
        <base-box data-ui-error>
          {{ actorState?.context?.remoteError }}
        </base-box>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script setup lang="ts">
import {
  AuthChallengeNames,
  getActorState,
  SignInState,
} from '@aws-amplify/ui';
import { computed, ComputedRef, useAttrs } from 'vue';
import { I18n } from 'aws-amplify';

import { useAuth } from '../composables/useAuth';
import {
  BACK_SIGN_IN_TEXT,
  CONFIRM_TEXT,
  CODE_TEXT,
} from '../defaults/DefaultTexts';

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
const backSignInText = computed(() => I18n.get(BACK_SIGN_IN_TEXT));
const confirmText = computed(() => I18n.get(CONFIRM_TEXT));
const codeText = computed(() => I18n.get(CODE_TEXT));

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
