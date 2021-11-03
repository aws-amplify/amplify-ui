<script setup lang="ts">
import { computed, useAttrs, toRefs } from 'vue';
import { translate } from '@aws-amplify/ui';

import FederatedSignIn from './federated-sign-in.vue';
import AuthenticatorSignUpFormFields from './authenticator-sign-up-form-fields.vue';

import { useAuthenticator } from '../composables/useAuth';
const facadeValues = useAuthenticator();
// const { submitForm, updateForm } = useAuthenticator();
const props = useAuthenticator();
const { hasValidationErrors, isPending, error } = toRefs(facadeValues);

const attrs = useAttrs();
const emit = defineEmits(['signUpSubmit']);

// computed properties

const createAccountLabel = computed(() => translate('Create Account'));
const signUpButtonText = computed(() => translate('Create a new account'));

// Methods

const onInput = (e: Event): void => {
  let { checked, name, type, value } = <HTMLInputElement>e.target;

  if (type === 'checkbox' && !checked)
    (value as string | undefined) = undefined;
  props.updateForm({ name, value });
};
const onSignUpSubmit = (e: Event): void => {
  if (attrs?.onSignUpSubmit) {
    emit('signUpSubmit', e);
  } else {
    submit();
  }
};

const submit = (): void => {
  props.submitForm();
};
</script>

<template>
  <slot v-bind="$attrs" name="signUpSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form @input="onInput" @submit.prevent="onSignUpSubmit">
        <base-wrapper class="amplify-flex" style="flex-direction: column">
          <base-heading class="amplify-heading" :level="3">
            <template #headingI>
              <slot name="heading"></slot>
            </template>
            {{ signUpButtonText }}
          </base-heading>
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
            {{ error }}
          </base-alert>
          <base-button
            class="amplify-button amplify-field-group__control"
            data-fullwidth="true"
            data-loading="false"
            data-variation="primary"
            style="border-radius: 0px; font-weight: normal"
            :disabled="isPending || hasValidationErrors"
            >{{ createAccountLabel }}</base-button
          >
          <base-footer>
            <template #footert="{ slotData }">
              <slot
                name="footer"
                :info="slotData"
                :onSignUpSubmit="onSignUpSubmit"
              >
              </slot>
            </template>
            <federated-sign-in></federated-sign-in>
          </base-footer>
        </base-wrapper>
      </base-form>
    </base-wrapper>
  </slot>
</template>
