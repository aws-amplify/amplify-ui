<script setup lang="ts">
import { computed, toRefs, useAttrs } from 'vue';
import {
  authenticatorTextUtil,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '../composables/useAuth';
import { UseAuthenticator } from '../types';
import BaseFormFields from './primitives/base-form-fields.vue';

/** @deprecated Component events are deprecated and not maintained. */
const emit = defineEmits(['confirmSignInSubmit', 'backToSignInClicked']);
const attrs = useAttrs();

// `facade` is manually typed to `UseAuthenticator` for temporary type safety.
const facade: UseAuthenticator = useAuthenticator();

const { submitForm, toSignIn, updateForm } = facade;
const { user, error, isPending } = toRefs(facade);

const challengeName = computed(() => user.value.challengeName);

// Text Util
const { getBackToSignInText, getConfirmText, getChallengeText } =
  authenticatorTextUtil;

// Computed Properties
const confirmSignInHeading = computed(() =>
  getChallengeText(challengeName.value)
);
const backSignInText = computed(() => getBackToSignInText());
const confirmText = computed(() => getConfirmText());

// Methods
const onInput = (e: Event): void => {
  const { name, value } = e.target as HTMLInputElement;
  updateForm({ name, value });
};

const onConfirmSignInSubmit = (e: Event): void => {
  // TODO(BREAKING): remove unused emit
  // istanbul ignore next
  if (attrs?.onConfirmSignInSubmit) {
    emit('confirmSignInSubmit', e);
  } else {
    submitForm(getFormDataFromEvent(e));
  }
};

const onBackToSignInClicked = (): void => {
  // TODO(BREAKING): remove unused emit
  // istanbul ignore next
  if (attrs?.onBackToSignInClicked) {
    emit('backToSignInClicked');
  } else {
    toSignIn();
  }
};
</script>

<template>
  <slot v-bind="$attrs" name="confirmSignInSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-confirmsignin
        @input="onInput"
        @submit.prevent="onConfirmSignInSubmit"
      >
        <base-field-set
          class="amplify-flex amplify-authenticator__column"
          :disabled="isPending"
        >
          <slot name="header">
            <base-heading :level="3" class="amplify-heading">
              {{ confirmSignInHeading }}
            </base-heading>
          </slot>
          <base-wrapper class="amplify-flex amplify-authenticator__column">
            <base-form-fields route="confirmSignIn"></base-form-fields>
          </base-wrapper>
          <base-footer class="amplify-flex amplify-authenticator__column">
            <base-alert v-if="error">
              {{ translate(error) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control amplify-authenticator__font"
              :fullwidth="false"
              :loading="false"
              :variation="'primary'"
              style="font-weight: normal"
              :disabled="isPending"
              >{{ confirmText }}</amplify-button
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
              :onConfirmSignInSubmit="onConfirmSignInSubmit"
            >
            </slot>
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>
