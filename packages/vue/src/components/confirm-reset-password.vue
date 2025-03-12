<script setup lang="ts">
import { computed, toRefs } from 'vue';

import {
  authenticatorTextUtil,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '../composables/useAuth';
import { UseAuthenticator } from '../types';
import BaseFormFields from './primitives/base-form-fields.vue';

// `facade` is manually typed to `UseAuthenticator` for temporary type safety.
const facade: UseAuthenticator = useAuthenticator();
const { resendCode, submitForm, updateBlur, updateForm } = facade;
const { error, isPending } = toRefs(facade);

// Text Util
const { getResendCodeText, getResetYourPasswordText, getSubmitText } =
  authenticatorTextUtil;

// Computed Properties
const resendCodeText = computed(() => getResendCodeText());
const confirmResetPasswordHeading = computed(() => getResetYourPasswordText());
const confirmResetPasswordText = computed(() => getSubmitText());

// Methods
const onConfirmResetPasswordSubmit = (e: Event): void => {
  submit(e);
};

const submit = (e: Event): void => {
  submitForm(getFormDataFromEvent(e));
};

const onLostYourCodeClicked = (): void => {
  resendCode();
};

const onInput = (e: Event) => {
  const { name, value } = e.target as HTMLInputElement;
  updateForm({ name, value });
};

function onBlur(e: Event) {
  const { name } = e.target as HTMLInputElement;
  updateBlur({ name });
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
          :disabled="isPending"
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
            <base-alert v-if="error">
              {{ translate(error) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control amplify-authenticator__font"
              :variation="'primary'"
              :fullwidth="false"
              type="submit"
              :disabled="isPending"
            >
              {{ confirmResetPasswordText }}
            </amplify-button>
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
            <slot name="footer"> </slot>
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>