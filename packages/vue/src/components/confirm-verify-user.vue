<script setup lang="ts">
import { computed, toRefs, useAttrs } from 'vue';

import {
  AuthenticatorServiceFacade,
  authenticatorTextUtil,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';
import BaseFormFields from './primitives/base-form-fields.vue';

import { useAuthenticator } from '../composables/useAuth';

// `useAuthenticator` is casted for temporary type safety on this file.
const props = useAuthenticator() as AuthenticatorServiceFacade;
const { error, isPending } = toRefs(props);
const { skipVerification, submitForm, updateForm } = props;

const attrs = useAttrs();

/** @deprecated Authenticator component events are deprecated and not maintained. */
const emit = defineEmits(['confirmVerifyUserSubmit', 'skipClicked']);

// Text Util
const { getAccountRecoveryInfoText, getSkipText, getSubmitText } =
  authenticatorTextUtil;

// Computed Properties
const verifyHeading = computed(() => getAccountRecoveryInfoText());
const skipText = computed(() => getSkipText());
const submitText = computed(() => getSubmitText());

// Methods
const onInput = (e: Event): void => {
  const { name, value } = e.target as HTMLInputElement;
  updateForm({ name, value });
};

const onConfirmVerifyUserSubmit = (e: Event): void => {
  // TODO(BREAKING): remove unused emit
  // istanbul ignore next
  if (attrs?.onConfirmVerifyUserSubmit) {
    emit('confirmVerifyUserSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  submitForm(getFormDataFromEvent(e));
};

const onSkipClicked = (): void => {
  // TODO(BREAKING): remove unused emit
  // istanbul ignore next
  if (attrs?.onSkipClicked) {
    emit('skipClicked');
  } else {
    skipVerification();
  }
};
</script>

<template>
  <slot v-bind="$attrs" name="confirmVerifyUserSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form @input="onInput" @submit.prevent="onConfirmVerifyUserSubmit">
        <base-field-set
          class="amplify-flex amplify-authenticator__column"
          :disabled="isPending"
        >
          <slot name="header">
            <base-heading :level="3" class="amplify-heading">
              {{ verifyHeading }}
            </base-heading>
          </slot>
          <base-wrapper class="amplify-flex amplify-authenticator__column">
            <base-form-fields route="confirmVerifyUser"></base-form-fields>
          </base-wrapper>

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
              >{{ submitText }}</amplify-button
            >
            <amplify-button
              class="amplify-field-group__control amplify-authenticator__font"
              :fullwidth="false"
              :size="'small'"
              :variation="'link'"
              style="font-weight: normal"
              type="button"
              @click.prevent="onSkipClicked"
            >
              {{ skipText }}</amplify-button
            >
            <slot
              name="footer"
              :onSkipClicked="onSkipClicked"
              :onConfirmVerifyUserSubmit="onConfirmVerifyUserSubmit"
            >
            </slot>
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>
