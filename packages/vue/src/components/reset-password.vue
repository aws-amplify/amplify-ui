<script setup lang="ts">
import { computed, useAttrs, toRefs } from 'vue';
import { getFormDataFromEvent, translate } from '@aws-amplify/ui';
import BaseFormFields from './primitives/base-form-fields.vue';

import { useAuthenticator } from '../composables/useAuth';
import { createSharedComposable } from '@vueuse/core';

const attrs = useAttrs();
const emit = defineEmits(['resetPasswordSubmit', 'backToSignInClicked']);

const useAuthShared = createSharedComposable(useAuthenticator);
const { send, submitForm } = useAuthShared();
const { error, isPending } = toRefs(useAuthShared());

// Computed Properties
const backSignInText = computed(() => translate('Back to Sign In'));
const resetPasswordHeading = computed(() => translate('Reset your password'));
const resetPasswordText = computed(() => translate('Send code'));

// Methods
const onResetPasswordSubmit = (e: Event): void => {
  if (attrs?.onResetPasswordSubmit) {
    emit('resetPasswordSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  submitForm(getFormDataFromEvent(e));
};

const onInput = (e: Event): void => {
  const { name, value } = e.target as HTMLInputElement;
  send({
    type: 'CHANGE',
    data: { name, value },
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

<template>
  <slot v-bind="$attrs" name="resetPasswordSlotI">
    <base-form
      v-bind="$attrs"
      data-amplify-authenticator-resetpassword
      @input="onInput"
      @submit.prevent="onResetPasswordSubmit"
    >
      <base-wrapper class="amplify-flex amplify-authenticator__column">
        <slot name="header">
          <base-heading class="amplify-heading" :level="3">
            {{ resetPasswordHeading }}
          </base-heading>
        </slot>
        <base-field-set
          class="amplify-flex amplify-authenticator__column"
          :disabled="isPending"
        >
          <base-form-fields route="resetPassword"></base-form-fields>
        </base-field-set>

        <base-footer class="amplify-flex amplify-authenticator__column">
          <base-alert v-if="error">
            {{ translate(error) }}
          </base-alert>
          <amplify-button
            class="amplify-field-group__control amplify-authenticator__font"
            :fullwidth="false"
            :variation="'primary'"
            type="submit"
            :disabled="isPending"
            >{{ resetPasswordText }}</amplify-button
          >
          <amplify-button
            class="amplify-field-group__control amplify-authenticator__font"
            :fullwidth="false"
            :size="'small'"
            :variation="'link'"
            style="font-weight: normal"
            type="button"
            @click.prevent="onBackToSignInClicked"
          >
            {{ backSignInText }}</amplify-button
          >
          <slot
            name="footer"
            :onBackToSignInClicked="onBackToSignInClicked"
            :onResetPasswordSubmit="onResetPasswordSubmit"
          >
          </slot>
        </base-footer>
      </base-wrapper>
    </base-form>
  </slot>
</template>
