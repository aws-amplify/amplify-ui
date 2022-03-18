<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import { createSharedComposable } from '@vueuse/core';

import {
  getActorState,
  SignInState,
  defaultFormFieldOptions,
  LoginMechanism,
  translate,
  getFormDataFromEvent,
} from '@aws-amplify/ui';

import { useAuth, useAuthenticator } from '../composables/useAuth';

const useAuthShared = createSharedComposable(useAuthenticator);
const props = useAuthShared();

const attrs = useAttrs();
const emit = defineEmits(['verifyUserSubmit', 'skipClicked']);

const { state, send } = useAuth();

const actorState: ComputedRef<SignInState> = computed(
  () => getActorState(state.value) as SignInState
);

const unverifiedAttributes = actorState.value.context.unverifiedAttributes;

// Computed Properties
const verifyHeading = computed(() =>
  translate('Account recovery requires verified contact information')
);
const skipText = computed(() => translate('Skip'));
const verifyText = computed(() => translate('Verify'));
const verifyContactText = computed(() => translate('Verify Contact'));

// Methods
const onInput = (e: Event): void => {
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};

const onVerifyUserSubmit = (e: Event): void => {
  if (attrs?.onVerifyUserSubmit) {
    emit('verifyUserSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  props.submitForm(getFormDataFromEvent(e));
};

const onSkipClicked = (): void => {
  if (attrs?.onSkipClicked) {
    emit('skipClicked');
  } else {
    send('SKIP');
  }
};
</script>

<template>
  <slot name="verifyUserSlotI">
    <base-wrapper>
      <base-form @input="onInput" @submit.prevent="onVerifyUserSubmit">
        <base-field-set
          :disabled="actorState.matches('verifyUser.pending')"
          class="amplify-flex"
          style="flex-direction: column"
        >
          <slot name="header">
            <base-heading class="amplify-heading" :level="3">
              {{ verifyHeading }}
            </base-heading>
          </slot>
          <base-wrapper
            class="amplify-flex amplify-field amplify-radiogroupfield"
            style="flex-direction: column"
          >
            <base-label
              class="amplify-visually-hidden amplify-label"
              id="amplify-field-493c"
            >
              {{ verifyContactText }}
            </base-label>
            <base-wrapper
              class="amplify-flex amplify-field amplify-radiogroupfield"
              style="flex-direction: column"
              aria-labelledby="amplify-field-493c"
            >
              <base-label
                class="amplify-flex amplify-radio"
                data-amplify-verify-label
                id="verify"
                v-for="(value, key) in unverifiedAttributes"
                :key="value"
              >
                <base-input
                  class="
                    amplify-input
                    amplify-field-group__control
                    amplify-visually-hidden
                    amplify-radio__input
                  "
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
          <base-footer class="amplify-flex" style="flex-direction: column">
            <base-alert v-if="actorState?.context?.remoteError">
              {{ translate(actorState?.context.remoteError) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-variation="primary"
              type="submit"
              style="font-weight: normal"
              :disabled="actorState.matches('verifyUser.pending')"
              >{{ verifyText }}</amplify-button
            >
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-size="small"
              data-variation="link"
              style="font-weight: normal"
              type="button"
              @click.prevent="onSkipClicked"
            >
              {{ skipText }}</amplify-button
            >
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
