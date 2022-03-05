<script setup lang="ts">
import { computed, useAttrs, toRefs } from 'vue';
import { getFormDataFromEvent, translate } from '@aws-amplify/ui';

import { useAuthenticator, useAuth } from '../composables/useAuth';
import { createSharedComposable } from '@vueuse/core';

const attrs = useAttrs();
const emit = defineEmits(['confirmSignUpSubmit', 'lostCodeClicked']);

const useAuthShared = createSharedComposable(useAuthenticator);
const { isPending, error, codeDeliveryDetails } = toRefs(useAuthShared());
const { submitForm, updateForm, resendCode } = useAuthShared();
const { state } = useAuth();

//computed properties

const {
  value: { context },
} = state;

const formOverrides = context?.config?.formFields?.confirmSignUp;

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
const emailMessage = translate(
  'Your code is on the way. To log in, enter the code we emailed to'
);
const textedMessage = translate(
  'Your code is on the way. To log in, enter the code we texted to'
);
const defaultMessage = translate(
  'Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.'
);
const minutesMessage = translate('It may take a minute to arrive.');
const subtitleText = computed(() => {
  return codeDeliveryDetails.value?.DeliveryMedium === 'EMAIL'
    ? `${emailMessage} ${codeDeliveryDetails.value?.Destination}. ${minutesMessage}`
    : codeDeliveryDetails.value?.DeliveryMedium === 'SMS'
    ? `${textedMessage} ${codeDeliveryDetails.value?.Destination}. ${minutesMessage}`
    : translate(`${defaultMessage}`);
});

const confOR = formOverrides?.['confirmation_code'];
const label = confOR?.label ?? confirmationCodeText;
const labelHidden = confOR?.labelHidden;

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
  submitForm(getFormDataFromEvent(e));
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
              <base-label
                class="amplify-label"
                :class="{ 'amplify-visually-hidden': labelHidden ?? true }"
                for="amplify-field-124b"
                >{{ label }}
              </base-label>
              <base-wrapper class="amplify-flex">
                <base-input
                  :placeholder="confOR?.placeholder ?? enterCode"
                  :required="confOR?.required ?? true"
                  class="amplify-input amplify-field-group__control"
                  id="amplify-field-124b"
                  aria-invalid="false"
                  autocomplete="one-time-code"
                  name="confirmation_code"
                  type="number"
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
