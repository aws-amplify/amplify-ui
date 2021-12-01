<script setup lang="ts">
import { computed, useAttrs, toRefs } from 'vue';
import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '../composables/useAuth';

const attrs = useAttrs();
const emit = defineEmits(['confirmSignUpSubmit', 'lostCodeClicked']);

const { isPending, error, codeDeliveryDetails } = toRefs(useAuthenticator());
const { submitForm, updateForm, resendCode } = useAuthenticator();

//computed properties

// Only two types of delivery methods is EMAIL or SMS
const confirmSignUpHeading = computed(() => {
  return codeDeliveryDetails.value?.DeliveryMedium === 'EMAIL'
    ? translate('We Emailed You')
    : codeDeliveryDetails.value?.DeliveryMedium === 'SMS'
    ? translate('We Texted You')
    : translate('We Sent A Code');
});

const enterCode = computed(() => translate('Enter your code'));
const confirmationCodeText = computed(() => translate('Confirmation Code'));
const resendCodeText = computed(() => translate('Resend Code'));
const confirmText = computed(() => translate('Confirm'));
const subtitleText = computed(() => {
  return codeDeliveryDetails.value?.DeliveryMedium === 'EMAIL'
    ? `Your code is on the way. To log in, enter the code we emailed to ${codeDeliveryDetails.value?.Destination}. It may take a minute to arrive.`
    : codeDeliveryDetails.value?.DeliveryMedium === 'SMS'
    ? `Your code is on the way. To log in, enter the code we texted to ${codeDeliveryDetails.value?.Destination}. It may take a minute to arrive.`
    : translate(
        `Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.`
      );
});

// Methods
const onInput = (e: Event): void => {
  const { name, value } = <HTMLInputElement>e.target;
  updateForm({ name, value });
};

const onConfirmSignUpSubmit = (e: Event): void => {
  if (attrs?.onConfirmSignUpSubmit) {
    emit('confirmSignUpSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  submitForm();
};

const onLostCodeClicked = (): void => {
  if (attrs?.onLostCodeClicked) {
    emit('lostCodeClicked');
  } else {
    resendCode();
  }
};
</script>

<template>
  <slot v-bind="$attrs" name="confirmSignUpSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form @input="onInput" @submit.prevent="onConfirmSignUpSubmit">
        <base-wrapper class="amplify-flex" style="flex-direction: column">
          <slot name="header">
            <base-heading
              class="amplify-heading"
              style="font-size: 1.5rem"
              :level="3"
            >
              {{ confirmSignUpHeading }}
            </base-heading>
          </slot>
          <base-text style="margin-bottom: 1rem">
            {{ subtitleText }}
          </base-text>
          <base-field-set
            class="amplify-flex"
            style="flex-direction: column"
            :disabled="isPending"
          >
            <base-wrapper
              class="amplify-flex amplify-field amplify-textfield"
              style="flex-direction: column"
            >
              <base-label class="sr-only amplify-label" for="amplify-field-124b"
                >{{ confirmationCodeText }}
              </base-label>
              <base-wrapper class="amplify-flex">
                <base-input
                  class="amplify-input amplify-field-group__control"
                  id="amplify-field-124b"
                  aria-invalid="false"
                  autocomplete="one-time-code"
                  name="confirmation_code"
                  required
                  :placeholder="enterCode"
                ></base-input>
              </base-wrapper>
            </base-wrapper>
          </base-field-set>

          <base-footer
            class="amplify-flex"
            style="flex-direction: column; align-items: unset"
          >
            <base-alert v-if="error">
              {{ error }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-loading="false"
              data-variation="primary"
              type="submit"
              style="font-weight: normal"
              :disabled="isPending"
            >
              {{ confirmText }}
            </amplify-button>
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-variation="default"
              style="font-weight: normal"
              type="button"
              @click.prevent="onLostCodeClicked"
            >
              {{ resendCodeText }}
            </amplify-button>
            <slot
              name="footer"
              :onConfirmSignUpSubmit="onConfirmSignUpSubmit"
              :onLostCodeClicked="onLostCodeClicked"
            >
            </slot>
          </base-footer>
        </base-wrapper>
      </base-form>
    </base-wrapper>
  </slot>
</template>
