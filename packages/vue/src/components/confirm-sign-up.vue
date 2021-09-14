<template>
  <slot v-bind="$attrs" name="confirmSignUpSlotI">
    <base-wrapper v-bind="$attrs" data-amplify-wrapper>
      <base-form @submit.prevent="onConfirmSignUpSubmit">
        <base-heading>
          {{ confirmSignUpHeading }}
        </base-heading>
        <base-field-set :disabled="actorState.matches('confirmSignUp.pending')">
          <user-name-alias
            :userNameAlias="true"
            :userName="
              actorState?.context?.user?.username ||
              actorState?.context?.authAttributes?.username
            "
            :disabled="true"
          />
          <base-label data-amplify-password>
            <base-text>{{ confirmationCodeText }}</base-text>
            <base-input
              name="confirmation_code"
              required
              type="number"
            ></base-input>
            <base-box>
              <base-text> {{ lostYourCodeText }}</base-text>
              <base-button type="button" @click.prevent="onLostCodeClicked">
                {{ resendCodeText }}
              </base-button>
            </base-box>
          </base-label>
        </base-field-set>

        <base-footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onBackToSignInClicked="onBackToSignInClicked"
              :onConfirmSignUpSubmit="onConfirmSignUpSubmit"
            >
            </slot>
          </template>
          <base-button
            v-if="!shouldHideReturnBtn"
            type="button"
            @click.prevent="onBackToSignInClicked"
          >
            {{ backSignInText }}</base-button
          >
          <base-spacer />
          <base-button :disabled="actorState.matches('confirmSignUp.pending')">
            {{ confirmText }}
          </base-button>
        </base-footer>
        <base-box data-ui-error>
          {{ actorState?.context?.remoteError }}
        </base-box>
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
  LOST_YOUR_CODE_TEXT,
  RESEND_CODE_TEXT,
  BACK_SIGN_IN_TEXT,
  CONFIRM_TEXT,
} from '../defaults/DefaultTexts';

import { useAuth } from '../composables/useAuth';
import UserNameAlias from './user-name-alias.vue';

import { getActorState, SignUpContext } from '@aws-amplify/ui';

const { shouldHideReturnBtn } = withDefaults(
  defineProps<{ shouldHideReturnBtn?: boolean }>(),
  {
    shouldHideReturnBtn: false,
  }
);

const attrs = useAttrs();
const emit = defineEmits([
  'confirmSignUpSubmit',
  'lostCodeClicked',
  'backToSignInClicked',
]);

const { state, send } = useAuth();
const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<any>;

const context = actorState.value.context as SignUpContext;
const username = context.user?.username ?? context.authAttributes?.username;

//computed properties
const confirmSignUpHeading = computed(() => I18n.get(CONFIRM_SIGNUP_HEADING));
const confirmationCodeText = computed(() => I18n.get(CONFIRMATION_CODE_TEXT));
const lostYourCodeText = computed(() => I18n.get(LOST_YOUR_CODE_TEXT));
const resendCodeText = computed(() => I18n.get(RESEND_CODE_TEXT));
const backSignInText = computed(() => I18n.get(BACK_SIGN_IN_TEXT));
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

const onBackToSignInClicked = (): void => {
  if (attrs?.onBackToSignInClicked) {
    emit('backToSignInClicked');
  } else {
    send({
      type: 'SIGN_IN',
    });
  }
};
</script>
