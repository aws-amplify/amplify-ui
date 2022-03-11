<script setup lang="ts">
import { computed, useAttrs, toRefs } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { translate, getFormDataFromEvent } from '@aws-amplify/ui';

import FederatedSignIn from './federated-sign-in.vue';
import AuthenticatorSignUpFormFields from './authenticator-sign-up-form-fields.vue';

import { useAuthenticator } from '../composables/useAuth';

const useAuthShared = createSharedComposable(useAuthenticator);
const facadeValues = useAuthShared();
const props = useAuthShared();
const { hasValidationErrors, isPending, error } = toRefs(facadeValues);

const attrs = useAttrs();
const emit = defineEmits(['signUpSubmit']);

// computed properties

const createAccountLabel = computed(() => translate('Create Account'));

// Methods

const onInput = (e: Event): void => {
  let { checked, name, type, value } = <HTMLInputElement>e.target;

  if (type === 'checkbox' && !checked)
    (value as string | undefined) = undefined;
  props.updateForm({ name, value });
};

function onBlur(e: Event) {
  const { name } = <HTMLInputElement>e.target;
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

        <base-wrapper class="amplify-flex" style="flex-direction: column">
          <base-field-set
            class="amplify-flex"
            style="flex-direction: column"
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
            class="amplify-field-group__control"
            data-fullwidth="true"
            data-loading="false"
            data-variation="primary"
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
