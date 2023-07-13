<script setup lang="ts">
import { computed, toRefs, useAttrs } from 'vue';

import {
  authenticatorTextUtil,
  defaultFormFieldOptions,
  getFormDataFromEvent,
  LoginMechanism,
  translate,
} from '@aws-amplify/ui';

import { UseAuthenticator } from '../types';
import { useAuthenticator } from '../composables/useAuth';

// `facade` is manually typed to `UseAuthenticator` for temporary type safety.
const facade: UseAuthenticator = useAuthenticator();
const { isPending, unverifiedContactMethods, error } = toRefs(facade);
const { skipVerification, submitForm, updateForm } = facade;

const attrs = useAttrs();

/** @deprecated Component events are deprecated and not maintained. */
const emit = defineEmits(['verifyUserSubmit', 'skipClicked']);

// Text Util
const {
  getAccountRecoveryInfoText,
  getSkipText,
  getVerifyText,
  getVerifyContactText,
} = authenticatorTextUtil;

// Computed Properties
const verifyHeading = computed(() => getAccountRecoveryInfoText());
const skipText = computed(() => getSkipText());
const verifyText = computed(() => getVerifyText());
const verifyContactText = computed(() => getVerifyContactText());

// Methods
const onInput = (e: Event): void => {
  const { name, value } = e.target as HTMLInputElement;
  updateForm({ name, value });
};

const onVerifyUserSubmit = (e: Event): void => {
  // TODO(BREAKING): remove unused emit
  // istanbul ignore next
  if (attrs?.onVerifyUserSubmit) {
    emit('verifyUserSubmit', e);
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
  <slot name="verifyUserSlotI">
    <base-wrapper>
      <base-form @input="onInput" @submit.prevent="onVerifyUserSubmit">
        <base-field-set
          :disabled="isPending"
          class="amplify-flex amplify-authenticator__column"
        >
          <slot name="header">
            <base-heading class="amplify-heading" :level="3">
              {{ verifyHeading }}
            </base-heading>
          </slot>
          <base-wrapper
            class="amplify-flex amplify-field amplify-radiogroupfield amplify-authenticator__column"
          >
            <!-- TODO(BREAKING): remove hard coded string 493c -->
            <base-label
              class="amplify-visually-hidden amplify-label"
              id="amplify-field-493c"
            >
              {{ verifyContactText }}
            </base-label>
            <base-wrapper
              class="amplify-flex amplify-field amplify-radiogroupfield amplify-authenticator__column"
              aria-labelledby="amplify-field-493c"
            >
              <base-label
                class="amplify-flex amplify-radio"
                data-amplify-verify-label
                id="verify"
                v-for="(value, key) in unverifiedContactMethods"
                :key="value"
              >
                <base-input
                  class="amplify-input amplify-field-group__control amplify-visually-hidden amplify-radio__input"
                  aria-invalid="false"
                  data-amplify-verify-input
                  id="verify"
                  name="unverifiedAttr"
                  type="radio"
                  :value="key"
                >
                </base-input>
                <base-text
                  class="amplify-flex amplify-radio__button"
                  aria-hidden="true"
                ></base-text>
                <base-text class="amplify-text amplify-radio__label">
                  {{ defaultFormFieldOptions[key as LoginMechanism].label }}
                </base-text>
              </base-label>
            </base-wrapper>
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
            >
              {{ verifyText }}
            </amplify-button>
            <amplify-button
              class="amplify-field-group__control amplify-authenticator__font"
              :fullwidth="false"
              :size="'small'"
              :variation="'link'"
              style="font-weight: normal"
              type="button"
              @click.prevent="onSkipClicked"
            >
              {{ skipText }}
            </amplify-button>
            <slot
              name="footer"
              :onSkipClicked="onSkipClicked"
              :onVerifyUserSubmit="onVerifyUserSubmit"
            >
            </slot>
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>
