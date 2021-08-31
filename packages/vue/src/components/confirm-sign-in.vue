<template>
  <slot name="confirmSignInSlotI">
    <base-wrapper data-amplify-wrapper>
      <base-form
        data-amplify-authenticator-confirmsignin
        @submit.prevent="onConfirmSignInSubmit"
      >
        <base-heading>
          {{ confirmSignInHeading }}
        </base-heading>
        <base-field-set :disabled="actorState.matches('confirmSignIn.pending')">
          <base-label data-amplify-password>
            <base-text>Code *</base-text>
            <base-input
              name="confirmation_code"
              placeholder="Code"
              autocomplete="one-time-code"
              required
              type="text"
            ></base-input>
          </base-label>
        </base-field-set>

        <base-footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onBackToSignInClicked="onBackToSignInClicked"
              :onConfirmSignInSubmit="onConfirmSignInSubmit"
            >
            </slot>
          </template>
          <base-button type="button" @click.prevent="onBackToSignInClicked">
            {{ backSignInText }}</base-button
          >
          <base-spacer />
          <base-button
            :disabled="actorState.matches('confirmSignIn.pending')"
            >{{ confirmText }}</base-button
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
import {
  AuthChallengeNames,
  getActorState,
  SignInState,
} from '@aws-amplify/ui';
import { computed, ComputedRef, defineComponent } from 'vue';
import { useAuth } from '../composables/useAuth';
import { BACK_SIGN_IN_TEXT, CONFIRM_TEXT } from '../defaults/DefaultTexts';
import { ConfirmSignInSetupReturnTypes, SetupEventContext } from '../types';
import BaseBox from './primitives/base-box.vue';
import BaseButton from './primitives/base-button.vue';
import BaseFieldSet from './primitives/base-field-set.vue';
import BaseFooter from './primitives/base-footer.vue';
import BaseForm from './primitives/base-form.vue';
import BaseHeading from './primitives/base-heading.vue';
import BaseInput from './primitives/base-input.vue';
import BaseLabel from './primitives/base-label.vue';
import BaseSpacer from './primitives/base-spacer.vue';
import BaseText from './primitives/base-text.vue';
import BaseWrapper from './primitives/base-wrapper.vue';

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
  setup(_, { emit, attrs }: SetupEventContext): ConfirmSignInSetupReturnTypes {
    const { state, send } = useAuth();
    const actorState: ComputedRef<SignInState> = computed(() =>
      getActorState(state.value)
    );
    const challengeName = actorState.value.context.challengeName;

    let mfaType: string = 'SMS';

    if (challengeName === AuthChallengeNames.SOFTWARE_TOKEN_MFA) {
      mfaType = 'TOTP';
    }
    const confirmSignInHeading = `Confirm ${mfaType} Code`;

    // Computed Properties
    const backSignInText = computed(() => BACK_SIGN_IN_TEXT);
    const confirmText = computed(() => CONFIRM_TEXT);

    // Methods
    const onConfirmSignInSubmit = (e: Event): void => {
      if (attrs?.onConfirmSignInSubmit) {
        emit('confirmSignInSubmit', e);
      } else {
        submit(e);
      }
    };

    const submit = (e): void => {
      const formData = new FormData(e.target);
      send({
        type: 'SUBMIT',
        //@ts-ignore
        data: {
          //@ts-ignore
          ...Object.fromEntries(formData),
        },
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
      confirmSignInHeading,
      onConfirmSignInSubmit,
      onBackToSignInClicked,
      submit,
      backSignInText,
      confirmText,
      actorState,
    };
  },
});
</script>
