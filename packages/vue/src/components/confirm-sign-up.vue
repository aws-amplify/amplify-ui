<template>
  <slot name="confirmSignUpSlotI">
    <base-wrapper data-amplify-wrapper>
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

<script lang="ts">
import { defineComponent, computed } from 'vue';
import BaseHeading from './primitives/base-heading.vue';
import BaseFieldSet from './primitives/base-field-set.vue';
import BaseLabel from './primitives/base-label.vue';
import UserNameAlias from './user-name-alias.vue';
import BaseSpacer from './primitives/base-spacer.vue';
import BaseButton from './primitives/base-button.vue';
import BaseFooter from './primitives/base-footer.vue';
import BaseText from './primitives/base-text.vue';
import BaseInput from './primitives/base-input.vue';
import BaseForm from './primitives/base-form.vue';
import BaseBox from './primitives/base-box.vue';
import BaseWrapper from './primitives/base-wrapper.vue';

import {
  CONFIRM_SIGNUP_HEADING,
  CONFIRMATION_CODE_TEXT,
  LOST_YOUR_CODE_TEXT,
  RESEND_CODE_TEXT,
  BACK_SIGN_IN_TEXT,
  CONFIRM_TEXT,
} from '../defaults/DefaultTexts';

import { useAuth } from '../composables/useAuth';

import { ConfirmPasswordSetupReturnTypes, SetupEventContext } from '../types';
import { getActorState, SignUpContext } from '@aws-amplify/ui-core';

export default defineComponent({
  components: {
    BaseBox,
    BaseHeading,
    BaseFieldSet,
    BaseForm,
    BaseLabel,
    BaseSpacer,
    BaseButton,
    BaseFooter,
    BaseText,
    BaseInput,
    BaseWrapper,
    UserNameAlias,
  },
  props: {
    shouldHideReturnBtn: {
      default: false,
      type: Boolean,
    },
  },
  inheritAttrs: false,
  setup(
    _,
    { emit, attrs }: SetupEventContext
  ): ConfirmPasswordSetupReturnTypes {
    const { state, send } = useAuth();
    const actorState = computed(() => getActorState(state.value));

    const context: SignUpContext = actorState.value.context;
    const username = context.user?.username ?? context.authAttributes?.username;

    //computed properties
    const confirmSignUpHeading = computed(() => CONFIRM_SIGNUP_HEADING);
    const confirmationCodeText = computed(() => CONFIRMATION_CODE_TEXT);
    const lostYourCodeText = computed(() => LOST_YOUR_CODE_TEXT);
    const resendCodeText = computed(() => RESEND_CODE_TEXT);
    const backSignInText = computed(() => BACK_SIGN_IN_TEXT);
    const confirmText = computed(() => CONFIRM_TEXT);

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

    return {
      onConfirmSignUpSubmit,
      onBackToSignInClicked,
      submit,
      confirmSignUpHeading,
      confirmationCodeText,
      lostYourCodeText,
      resendCodeText,
      backSignInText,
      confirmText,
      onLostCodeClicked,
      actorState,
      send,
      username,
    };
  },
});
</script>
