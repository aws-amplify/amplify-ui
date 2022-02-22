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
                class="amplify-visually-hidden amplify-label"
                for="amplify-field-c34b"
                >{{ confirmationCodeText }}</base-label
              >
              <base-wrapper class="amplify-flex">
                <base-input
                  class="amplify-input amplify-field-group__control"
                  id="amplify-field-c34b"
                  aria-invalid="false"
                  autocomplete="one-time-code"
                  name="confirmation_code"
                  required
                  :placeholder="codeText"
                  type="text"
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

<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import { getActorState, SignInState, translate } from '@aws-amplify/ui';

import { useAuth } from '../composables/useAuth';

const attrs = useAttrs();
const emit = defineEmits(['confirmVerifyUserSubmit', 'skipClicked']);

const { state, send } = useAuth();
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
  const formData = new FormData(<HTMLFormElement>e.target);
  send({
    type: 'SUBMIT',
    //@ts-ignore
    data: {
      //@ts-ignore
      ...Object.fromEntries(formData),
    },
  });
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
