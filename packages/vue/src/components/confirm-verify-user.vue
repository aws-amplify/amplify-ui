<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import { createSharedComposable } from '@vueuse/core';

import {
  authenticatorTextUtil,
  getActorState,
  getFormDataFromEvent,
  SignInState,
  translate,
} from '@aws-amplify/ui';
import BaseFormFields from './primitives/base-form-fields.vue';

import { useAuth, useAuthenticator } from '../composables/useAuth';

const useAuthShared = createSharedComposable(useAuthenticator);
const props = useAuthShared();

const attrs = useAttrs();
const emit = defineEmits(['confirmVerifyUserSubmit', 'skipClicked']);

const { state, send } = useAuth();

const actorState: ComputedRef<SignInState> = computed(
  () => getActorState(state.value) as SignInState
);

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
          class="amplify-flex amplify-authenticator__column"
          :disabled="actorState.matches('confirmVerifyUser.pending')"
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
            <base-alert v-if="actorState?.context?.remoteError">
              {{ translate(actorState?.context.remoteError) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control amplify-authenticator__font"
              :fullwidth="false"
              :variation="'primary'"
              type="submit"
              :disabled="actorState.matches('confirmVerifyUser.pending')"
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
