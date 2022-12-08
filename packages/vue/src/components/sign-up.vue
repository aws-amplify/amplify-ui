<script setup lang="ts">
import { computed, useAttrs, toRefs } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import {
  authenticatorTextUtil,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';

import FederatedSignIn from './federated-sign-in.vue';
import AuthenticatorSignUpFormFields from './authenticator-sign-up-form-fields.vue';

import { useAuthenticator } from '../composables/useAuth';

const useAuthShared = createSharedComposable(useAuthenticator);
const facadeValues = useAuthShared();
const props = useAuthShared();
const { hasValidationErrors, isPending, error } = toRefs(facadeValues);

const attrs = useAttrs();
const emit = defineEmits(['signUpSubmit']);

// Text Util
const { getCreateAccountText } = authenticatorTextUtil;
// Computed Properties
const createAccountLabel = computed(() => getCreateAccountText());

// Methods

const onInput = (e: Event): void => {
  let { checked, name, type, value } = e.target as HTMLInputElement;

  if (type === 'checkbox' && !checked)
    (value as string | undefined) = undefined;
  props.updateForm({ name, value });
};

function onBlur(e: Event) {
  const { name } = e.target as HTMLInputElement;
  props.updateBlur({ name });
}

const onSignUpSubmit = (e: Event): void => {
  if (attrs?.onSignUpSubmit) {
    emit('signUpSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  props.submitForm(getFormDataFromEvent(e));
};
</script>

<template>
  <slot v-bind="$attrs" name="signUpSlotI">
    <slot name="header"></slot>

    <base-wrapper v-bind="$attrs">
      <base-form
        @input="onInput"
        @blur.capture="onBlur"
        @submit.prevent="onSignUpSubmit"
      >
        <federated-sign-in></federated-sign-in>

        <base-wrapper class="amplify-flex amplify-authenticator__column">
          <base-field-set
            class="amplify-flex amplify-authenticator__column"
            :disabled="isPending"
          >
            <template #fieldSetI="{ slotData }">
              <slot name="signup-fields" :info="slotData"> </slot>
            </template>
            <authenticator-sign-up-form-fields />
          </base-field-set>
          <base-alert v-if="error">
            {{ translate(error) }}
          </base-alert>
          <amplify-button
            class="amplify-field-group__control amplify-authenticator__font"
            :fullwidth="true"
            :loading="false"
            :variation="'primary'"
            style="border-radius: 0px; font-weight: normal"
            :disabled="isPending || hasValidationErrors"
            >{{ createAccountLabel }}</amplify-button
          >
        </base-wrapper>
      </base-form>
    </base-wrapper>

    <base-footer>
      <slot name="footer"> </slot>
    </base-footer>
  </slot>
</template>
