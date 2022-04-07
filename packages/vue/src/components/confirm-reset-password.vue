<script setup lang="ts">
import { computed, ComputedRef, useAttrs, defineEmits } from 'vue';
import { createSharedComposable } from '@vueuse/core';

import {
  getActorContext,
  getActorState,
  ResetPasswordContext,
  ResetPasswordState,
  translate,
  getFormDataFromEvent,
} from '@aws-amplify/ui';

import { useAuth, useAuthenticator } from '../composables/useAuth';
import BaseFormFields from './primitives/base-form-fields.vue';

const { state, send } = useAuth();

const useAuthShared = createSharedComposable(useAuthenticator);
const props = useAuthShared();

const attrs = useAttrs();
const emit = defineEmits(['confirmResetPasswordSubmit', 'backToSignInClicked']);

const actorState: ComputedRef<ResetPasswordState> = computed(() =>
  getActorState(state.value)
) as ComputedRef<ResetPasswordState>;

const actorContext = computed(() =>
  getActorContext(state.value)
) as ComputedRef<ResetPasswordContext>;

// Computed Properties
const resendCodeText = computed(() => translate('Resend Code'));
const confirmResetPasswordHeading = computed(() =>
  translate('Reset your Password')
);
const confirmResetPasswordText = computed(() => translate('Submit'));

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
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    data: { name, value },
  });
};

function onBlur(e: Event) {
  const { name } = <HTMLInputElement>e.target;
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
          class="amplify-flex"
          style="flex-direction: column"
          :disabled="actorState.matches('confirmResetPassword.pending')"
        >
          <slot name="header">
            <base-heading class="amplify-heading" :level="3">
              {{ confirmResetPasswordHeading }}
            </base-heading>
          </slot>

          <base-wrapper class="amplify-flex" style="flex-direction: column">
            <base-form-fields route="confirmResetPassword"></base-form-fields>
          </base-wrapper>
          <base-footer class="amplify-flex" style="flex-direction: column">
            <base-alert v-if="actorState?.context?.remoteError">
              {{ translate(actorState?.context?.remoteError) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-variation="primary"
              type="submit"
              style="font-weight: normal"
              :disabled="actorState.matches('confirmResetPassword.pending')"
              >{{ confirmResetPasswordText }}</amplify-button
            >
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-size="small"
              data-variation="link"
              type="button"
              @click.prevent="onLostYourCodeClicked"
              style="font-weight: normal"
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
