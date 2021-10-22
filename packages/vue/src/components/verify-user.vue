<template>
  <slot name="verifyUserSlotI">
    <base-wrapper>
      <base-form @input="onInput" @submit.prevent="onVerifyUserSubmit">
        <base-field-set
          :disabled="actorState.matches('verifyUser.pending')"
          class="amplify-flex"
          style="flex-direction: column"
        >
          <base-heading class="amplify-heading" :level="3">
            {{ verifyHeading }}
          </base-heading>
          <base-wrapper
            class="amplify-flex amplify-field amplify-radiogroupfield"
            style="flex-direction: column"
          >
            <base-label class="sr-only amplify-label" id="amplify-field-493c">
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
                  class=" amplify-input amplify-field-group__control amplify-visually-hidden amplify-radio__input"
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
                  {{ authInputAttributes[key as UserNameAlias].label }}
                </base-text>
              </base-label>
            </base-wrapper>
          </base-wrapper>
          <base-footer class="amplify-flex" style="flex-direction: column">
            <template #footert="{ slotData }">
              <slot
                name="footer"
                :info="slotData"
                :onSkipClicked="onSkipClicked"
                :onVerifyUserSubmit="onVerifyUserSubmit"
              >
              </slot>
            </template>
            <base-alert v-if="actorState?.context?.remoteError">
              {{ actorState?.context.remoteError }}
            </base-alert>
            <base-button
              class="amplify-button amplify-field-group__control"
              data-fullwidth="false"
              data-variation="primary"
              type="submit"
              style="font-weight: normal"
              :disabled="actorState.matches('verifyUser.pending')"
              >{{ verifyText }}</base-button
            >
            <base-button
              class="amplify-button amplify-field-group__control"
              data-fullwidth="false"
              data-size="small"
              data-variation="link"
              style="font-weight: normal"
              type="button"
              @click.prevent="onSkipClicked"
            >
              {{ skipText }}</base-button
            >
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import {
  getActorState,
  SignInState,
  authInputAttributes,
  UserNameAlias,
  translate,
} from '@aws-amplify/ui';

import { useAuth } from '../composables/useAuth';

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
    send('SKIP');
  }
};
</script>
