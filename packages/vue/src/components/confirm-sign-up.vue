<template>
  <slot v-bind="$attrs" name="confirmSignUpSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form @submit.prevent="onConfirmSignUpSubmit">
        <base-wrapper class="amplify-flex" style="flex-direction: column">
          <base-heading class="amplify-heading" :level="3">
            {{ confirmSignUpHeading }}
          </base-heading>
          <base-field-set
            class="amplify-flex"
            style="flex-direction: column"
            :disabled="actorState.matches('confirmSignUp.pending')"
          >
            <base-wrapper
              class="amplify-flex amplify-field amplify-textfield"
              style="flex-direction: column"
            >
              <base-label class="amplify-label sr-only" for="amplify-field-124b"
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
                  type="number"
                ></base-input>
              </base-wrapper>
            </base-wrapper>
          </base-field-set>

          <base-footer
            class="amplify-flex"
            style="flex-direction: column; align-items: unset"
          >
            <template #footert="{ slotData }">
              <slot
                name="footer"
                :info="slotData"
                :onConfirmSignUpSubmit="onConfirmSignUpSubmit"
              >
              </slot>
            </template>
            <base-alert v-if="actorState?.context?.remoteError">
              {{ actorState?.context?.remoteError }}
            </base-alert>
            <base-button
              class="amplify-button amplify-field-group__control"
              data-fullwidth="false"
              data-loading="false"
              data-variation="primary"
              type="submit"
              style="font-weight: normal"
              :disabled="actorState.matches('confirmSignUp.pending')"
            >
              {{ confirmText }}
            </base-button>
            <base-button
              class="amplify-button amplify-field-group__control"
              data-fullwidth="false"
              data-variation="default"
              style="font-weight: normal"
              type="button"
              @click.prevent="onLostCodeClicked"
            >
              {{ resendCodeText }}
            </base-button>
          </base-footer>
        </base-wrapper>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import { I18n } from 'aws-amplify';

import {
  CONFIRM_SIGNUP_HEADING,
  CONFIRMATION_CODE_TEXT,
  RESEND_CODE_TEXT,
  CONFIRM_TEXT,
  ENTER_CODE,
} from '../defaults/DefaultTexts';

import { useAuth } from '../composables/useAuth';

import { getActorState, SignUpContext } from '@aws-amplify/ui';

const attrs = useAttrs();
const emit = defineEmits(['confirmSignUpSubmit', 'lostCodeClicked']);

const { state, send } = useAuth();
const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<any>;

const context = actorState.value.context as SignUpContext;
const username = context.user?.username ?? context.authAttributes?.username;

//computed properties
const enterCode = computed(() => I18n.get(ENTER_CODE));
const confirmSignUpHeading = computed(() => I18n.get(CONFIRM_SIGNUP_HEADING));
const confirmationCodeText = computed(() => I18n.get(CONFIRMATION_CODE_TEXT));
const resendCodeText = computed(() => I18n.get(RESEND_CODE_TEXT));
const confirmText = computed(() => I18n.get(CONFIRM_TEXT));

// Methods
const onConfirmSignUpSubmit = (e: Event): void => {
  if (attrs?.onConfirmSignUpSubmit) {
    emit('confirmSignUpSubmit', e);
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
      username,
    },
  });
};

const onLostCodeClicked = (): void => {
  // do something
  if (attrs?.onLostCodeClicked) {
    emit('lostCodeClicked');
  } else {
    send({
      type: 'RESEND',
      //@ts-ignore
      data: { username },
    });
  }
};
</script>
