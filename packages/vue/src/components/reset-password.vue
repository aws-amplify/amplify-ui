<script setup lang="ts">
import { computed, useAttrs, toRefs } from 'vue';
import {
  getAliasInfoFromContext,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '../composables/useAuth';
import { createSharedComposable } from '@vueuse/core';

const attrs = useAttrs();
const emit = defineEmits(['resetPasswordSubmit', 'backToSignInClicked']);

const useAuthShared = createSharedComposable(useAuthenticator);
const { state, send, submitForm } = useAuthShared();
const { error, isPending } = toRefs(useAuthShared());

const formOverrides = state.context?.config?.formFields?.resetPassword;
const userOverrides = formOverrides?.['username'];

const { label } = getAliasInfoFromContext(state.context);

const labelText = `Enter your ${label.toLowerCase()}`;

// Computed Properties
const backSignInText = computed(() => translate('Back to Sign In'));
const resetPasswordHeading = computed(() => translate('Reset your password'));
const resetPasswordText = computed(() => translate('Send Code'));
const enterUsernameText = computed(() => translate<string>(labelText));

const labelValue = userOverrides?.label ?? labelText;
const labelHidden = userOverrides?.labelHidden;

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
  const { name, value } = <HTMLFormElement>e.target;
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
      <base-wrapper class="amplify-flex" style="flex-direction: column">
        <slot name="header">
          <base-heading class="amplify-heading" :level="3">
            {{ resetPasswordHeading }}
          </base-heading>
        </slot>
        <base-field-set
          class="amplify-flex"
          style="flex-direction: column"
          :disabled="isPending"
        >
          <base-wrapper
            class="amplify-flex amplify-field amplify-textfield"
            style="flex-direction: column"
          >
            <base-label
              class="amplify-label"
              :class="{ 'amplify-visually-hidden': labelHidden ?? true }"
              for="amplify-field-7dce"
            >
              {{ labelValue }}
            </base-label>
            <base-wrapper class="amplify-flex">
              <base-input
                :placeholder="userOverrides?.placeholder ?? enterUsernameText"
                :required="userOverrides?.required ?? true"
                class="amplify-input amplify-field-group__control"
                id="amplify-field-7dce"
                aria-invalid="false"
                name="username"
                autocomplete="username"
                type="username"
              ></base-input>
            </base-wrapper>
          </base-wrapper>
        </base-field-set>

        <base-footer
          class="amplify-flex"
          style="flex-direction: column; align-items: unset"
        >
          <base-alert v-if="error">
            {{ translate(error) }}
          </base-alert>
          <amplify-button
            class="amplify-field-group__control"
            data-fullwidth="false"
            data-variation="primary"
            type="submit"
            style="font-weight: normal"
            :disabled="isPending"
            >{{ resetPasswordText }}</amplify-button
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
            :onResetPasswordSubmit="onResetPasswordSubmit"
          >
          </slot>
        </base-footer>
      </base-wrapper>
    </base-form>
  </slot>
</template>
