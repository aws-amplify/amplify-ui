<script setup lang="ts">
import { computed, ComputedRef, useAttrs, defineEmits } from 'vue';

import {
  authenticatorTextUtil,
  getActorState,
  ResetPasswordState,
  translate,
  getFormDataFromEvent,
} from '@aws-amplify/ui';

import { useAuth, useAuthenticator } from '../composables/useAuth';
import BaseFormFields from './primitives/base-form-fields.vue';

const { state, send } = useAuth();

const props = useAuthenticator();

const attrs = useAttrs();
const emit = defineEmits(['confirmResetPasswordSubmit', 'backToSignInClicked']);

const actorState: ComputedRef<ResetPasswordState> = computed(() =>
  getActorState(state.value)
) as ComputedRef<ResetPasswordState>;

// Text Util
const { getResendCodeText, getResetYourPasswordText, getSubmitText } =
  authenticatorTextUtil;

// Computed Properties
const resendCodeText = computed(() => getResendCodeText());
const confirmResetPasswordHeading = computed(() => getResetYourPasswordText());
const confirmResetPasswordText = computed(() => getSubmitText());

// Methods
const onConfirmResetPasswordSubmit = (e: Event): void => {
  if (attrs?.onConfirmResetPasswordSubmit) {
    emit('confirmResetPasswordSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  props.submitForm(getFormDataFromEvent(e));
};

const onLostYourCodeClicked = (): void => {
  send({
    type: 'RESEND',
  });
};

const onInput = (e: Event) => {
  const { name, value } = e.target as HTMLInputElement;
  send({
    type: 'CHANGE',
    data: { name, value },
  });
};

function onBlur(e: Event) {
  const { name } = e.target as HTMLInputElement;
  props.updateBlur({ name });
}
</script>

<template>
  <slot v-bind="$attrs" name="confirmResetPasswordSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-confirmResetpassword
        @input="onInput"
        @blur.capture="onBlur"
        @submit.prevent="onConfirmResetPasswordSubmit"
      >
        <base-field-set
          class="amplify-flex amplify-authenticator__column"
          :disabled="actorState.matches('confirmResetPassword.pending')"
        >
          <slot name="header">
            <base-heading class="amplify-heading" :level="3">
              {{ confirmResetPasswordHeading }}
            </base-heading>
          </slot>

          <base-wrapper class="amplify-flex amplify-authenticator__column">
            <base-form-fields route="confirmResetPassword"></base-form-fields>
          </base-wrapper>
          <base-footer class="amplify-flex amplify-authenticator__column">
            <base-alert v-if="actorState?.context?.remoteError">
              {{ translate(actorState?.context?.remoteError) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control amplify-authenticator__font"
              :variation="'primary'"
              :fullwidth="false"
              type="submit"
              :disabled="actorState.matches('confirmResetPassword.pending')"
              >{{ confirmResetPasswordText }}</amplify-button
            >
            <amplify-button
              class="amplify-field-group__control amplify-authenticator__font"
              :variation="'link'"
              :fullwidth="false"
              :size="'small'"
              type="button"
              @click.prevent="onLostYourCodeClicked"
            >
              {{ resendCodeText }}
            </amplify-button>
            <slot
              name="footer"
              :onConfirmResetPasswordSubmit="onConfirmResetPasswordSubmit"
              :onLostYourCodeClicked="onLostYourCodeClicked"
            >
            </slot>
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>
