<template>
  <slot name="confirmResetPasswordSlotI">
    <base-wrapper data-amplify-wrapper>
      <base-form
        data-amplify-authenticator-confirmResetpassword
        @submit.prevent="onConfirmResetPasswordSubmit"
        @change="onChange"
      >
        <base-heading>
          {{ confirmResetPasswordHeading }}
        </base-heading>
        <base-field-set
          :disabled="actorState.matches('confirmResetPassword.pending')"
        >
          <base-label data-amplify-confirmresetpassword-label>
            <base-text>{{ confirmationCodeText }}</base-text>
            <base-input
              name="confirmation_code"
              required
              type="number"
            ></base-input>
          </base-label>

          <base-label data-amplify-confirmresetpassword-label>
            <base-text>New password</base-text>
            <base-input
              name="password"
              autocomplete="password"
              required
              type="password"
            ></base-input>
          </base-label>
          <base-box data-amplify-lostcode>
            <slot
              name="lost-your-code-section"
              :onLostYourCodeClicked="onLostYourCodeClicked"
            >
              <base-text> {{ lostYourCodeText }}</base-text>
              <base-button type="button" @click.prevent="onLostYourCodeClicked">
                {{ resendCodeText }}
              </base-button>
            </slot>
          </base-box>
        </base-field-set>

        <base-footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onBackToSignInClicked="onBackToSignInClicked"
              :onConfirmResetPasswordSubmit="onConfirmResetPasswordSubmit"
            >
            </slot>
          </template>
          <base-button type="button" @click.prevent="onBackToSignInClicked">
            {{ backSignInText }}</base-button
          >
          <base-spacer />
          <base-button
            :disabled="actorState.matches('confirmResetPassword.pending')"
            >{{ confirmResetPasswordText }}</base-button
          >
        </base-footer>
        <base-box data-ui-error>
          {{ actorState?.context?.remoteError }}
        </base-box>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import { I18n } from 'aws-amplify';

import BaseHeading from './primitives/base-heading.vue';
import BaseFieldSet from './primitives/base-field-set.vue';
import BaseLabel from './primitives/base-label.vue';
import BaseSpacer from './primitives/base-spacer.vue';
import BaseButton from './primitives/base-button.vue';
import BaseFooter from './primitives/base-footer.vue';
import BaseText from './primitives/base-text.vue';
import BaseInput from './primitives/base-input.vue';
import BaseForm from './primitives/base-form.vue';
import BaseBox from './primitives/base-box.vue';
import BaseWrapper from './primitives/base-wrapper.vue';

import { useAuth } from '../composables/useAuth';

import {
  BACK_SIGN_IN_TEXT,
  CONFIRM_RESET_PASSWORD_TEXT,
  LOST_YOUR_CODE_TEXT,
  RESEND_CODE_TEXT,
  CONFIRM_RESET_PASSWORD_HEADING,
  CONFIRMATION_CODE_TEXT,
} from '../defaults/DefaultTexts';
import {
  ConfirmResetPasswordSetupReturnTypes,
  SetupEventContext,
} from '../types';
import { getActorState, ResetPasswordState } from '@aws-amplify/ui';

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
  },
  inheritAttrs: false,
  setup(
    _,
    { emit, attrs }: SetupEventContext
  ): ConfirmResetPasswordSetupReturnTypes {
    const { state, send } = useAuth();
    const actorState: ComputedRef<ResetPasswordState> = computed(() =>
      getActorState(state.value)
    ) as ComputedRef<ResetPasswordState>;
    // Computed Properties
    const backSignInText = computed(() => I18n.get(BACK_SIGN_IN_TEXT));
    const lostYourCodeText = computed(() => I18n.get(LOST_YOUR_CODE_TEXT));
    const resendCodeText = computed(() => I18n.get(RESEND_CODE_TEXT));
    const confirmationCodeText = computed(() =>
      I18n.get(CONFIRMATION_CODE_TEXT)
    );
    const confirmResetPasswordHeading = computed(() =>
      I18n.get(CONFIRM_RESET_PASSWORD_HEADING)
    );
    const confirmResetPasswordText = computed(() =>
      I18n.get(CONFIRM_RESET_PASSWORD_TEXT)
    );

    // Methods
    const onConfirmResetPasswordSubmit = (e: Event): void => {
      if (attrs?.onConfirmResetPasswordSubmit) {
        emit('confirmResetPasswordSubmit', e);
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

    const onLostYourCodeClicked = (): void => {
      send({
        type: 'RESEND',
      });
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

    const onChange = (e: Event) => {
      const { name, value } = <HTMLInputElement>e.target;
      send({
        type: 'CHANGE',
        data: { name, value },
      });
    };

    return {
      onConfirmResetPasswordSubmit,
      onBackToSignInClicked,
      submit,
      onLostYourCodeClicked,
      onChange,
      backSignInText,
      actorState,
      lostYourCodeText,
      resendCodeText,
      confirmationCodeText,
      confirmResetPasswordText,
      confirmResetPasswordHeading,
    };
  },
});
</script>
