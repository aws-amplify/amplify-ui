<template>
  <slot name="resetPasswordSlotI">
    <base-wrapper data-amplify-wrapper>
      <base-form
        data-amplify-authenticator-resetpassword
        @submit.prevent="onResetPasswordSubmit"
        @change="onChange"
      >
        <base-heading>
          {{ resetPasswordHeading }}
        </base-heading>
        <base-field-set :disabled="actorState.matches('resetPassword.pending')">
          <base-label data-amplify-resetpassword-label>
            <base-text>Username</base-text>
            <base-input
              name="username"
              :placeholder="enterUsernameText"
              autocomplete="username"
              required
              type="username"
            ></base-input>
          </base-label>
        </base-field-set>

        <base-footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onBackToSignInClicked="onBackToSignInClicked"
              :onResetPasswordSubmit="onResetPasswordSubmit"
            >
            </slot>
          </template>
          <base-button type="button" @click.prevent="onBackToSignInClicked">
            {{ backSignInText }}</base-button
          >
          <base-spacer />
          <base-button
            :disabled="actorState.matches('resetPassword.pending')"
            >{{ resetPasswordText }}</base-button
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
  RESET_PASSWORD_HEADING,
  RESET_PASSWORD_TEXT,
  ENTER_USERNAME_TEXT,
} from '../defaults/DefaultTexts';
import { ResetPasswordSetupReturnTypes, SetupEventContext } from '../types';
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
  setup(_, { emit, attrs }: SetupEventContext): ResetPasswordSetupReturnTypes {
    const { state, send } = useAuth();
    const actorState: ComputedRef<ResetPasswordState> = computed(() =>
      getActorState(state.value)
    ) as ComputedRef<ResetPasswordState>;
    // Computed Properties
    const backSignInText = computed(() => I18n.get(BACK_SIGN_IN_TEXT));
    const resetPasswordHeading = computed(() =>
      I18n.get(RESET_PASSWORD_HEADING)
    );
    const resetPasswordText = computed(() => I18n.get(RESET_PASSWORD_TEXT));
    const enterUsernameText = computed(() => I18n.get(ENTER_USERNAME_TEXT));

    // Methods
    const onResetPasswordSubmit = (e: Event): void => {
      if (attrs?.onResetPasswordSubmit) {
        emit('resetPasswordSubmit', e);
      } else {
        submit(e);
      }
    };

    const submit = (e: Event): void => {
      const formData = new FormData(<HTMLFormElement>e.target);
      send({
        type: 'SUBMIT',
        data: Object.fromEntries(formData),
      });
    };

    const onChange = (e: Event): void => {
      const { name, value } = <HTMLFormElement>e.target;
      send({
        type: 'CHANGE',
        data: { name, value },
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

    return {
      onResetPasswordSubmit,
      onBackToSignInClicked,
      submit,
      resetPasswordText,
      resetPasswordHeading,
      backSignInText,
      enterUsernameText,
      actorState,
      onChange,
    };
  },
});
</script>
