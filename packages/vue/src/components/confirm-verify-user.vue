<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import { createSharedComposable } from '@vueuse/core';

import {
  getActorState,
  getFormDataFromEvent,
  SignInState,
  translate,
} from '@aws-amplify/ui';

import { useAuth, useAuthenticator } from '../composables/useAuth';

const useAuthShared = createSharedComposable(useAuthenticator);
const props = useAuthShared();

const attrs = useAttrs();
const emit = defineEmits(['confirmVerifyUserSubmit', 'skipClicked']);

const { state, send } = useAuth();

const {
  value: { context },
} = state;

const formOverrides = context?.config?.formFields?.confirmVerifyUser;
const confOR = formOverrides?.['confirmation_code'];

const actorState: ComputedRef<SignInState> = computed(
  () => getActorState(state.value) as SignInState
);

// Computed Properties
const verifyHeading = computed(() =>
  translate('Account recovery requires verified contact information')
);
const skipText = computed(() => translate('Skip'));
const verifyText = computed(() => translate('Verify'));
const confirmationCodeText = computed(() => translate('Confirmation Code'));
const codeText = computed(() => translate('Code'));
const submitText = computed(() => translate('Submit'));

const label = confOR?.label ?? confirmationCodeText.value;
const labelHidden = confOR?.labelHidden;

// Methods
const onInput = (e: Event): void => {
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};

const onConfirmVerifyUserSubmit = (e: Event): void => {
  if (attrs?.onConfirmVerifyUserSubmit) {
    emit('confirmVerifyUserSubmit', e);
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
    send({
      type: 'SKIP',
    });
  }
};
</script>

<template>
  <slot v-bind="$attrs" name="confirmVerifyUserSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form @input="onInput" @submit.prevent="onConfirmVerifyUserSubmit">
        <base-field-set
          class="amplify-flex"
          style="flex-direction: column"
          :disabled="actorState.matches('confirmVerifyUser.pending')"
        >
          <slot name="header">
            <base-heading :level="3" class="amplify-heading">
              {{ verifyHeading }}
            </base-heading>
          </slot>
          <base-wrapper class="amplify-flex" style="flex-direction: column">
            <base-wrapper
              class="amplify-flex amplify-field amplify-textfield"
              style="flex-direction: column"
            >
              <base-label
                class="amplify-label"
                :class="{ 'amplify-visually-hidden': labelHidden ?? true }"
                for="amplify-field-c34b"
                >{{ label }}</base-label
              >
              <base-wrapper class="amplify-flex">
                <base-input
                  :placeholder="confOR?.placeholder ?? codeText"
                  :required="confOR?.required ?? true"
                  class="amplify-input amplify-field-group__control"
                  id="amplify-field-c34b"
                  aria-invalid="false"
                  autocomplete="one-time-code"
                  name="confirmation_code"
                  type="number"
                ></base-input>
              </base-wrapper>
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
              :disabled="actorState.matches('confirmVerifyUser.pending')"
              >{{ submitText }}</amplify-button
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
              :onConfirmVerifyUserSubmit="onConfirmVerifyUserSubmit"
            >
            </slot>
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>
