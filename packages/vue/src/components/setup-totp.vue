<template>
  <slot name="confirmSetupTOTPI">
    <base-wrapper data-amplify-wrapper>
      <base-form
        data-amplify-authenticator-setup-totp
        @submit.prevent="onSetupTOTPSubmit"
      >
        <base-heading>
          {{ setupTOTPText }}
        </base-heading>
        <base-field-set :disabled="actorState.matches('confirmSignIn.pending')">
          <base-label data-amplify-confirmationcode>
            <template v-if="isLoading">
              <p>Loading...</p>
            </template>
            <template v-else>
              <img data-amplify-qrcode :src="qrCodeImageSource" alt="qr code" />
              <base-text>Code *</base-text>
              <base-input
                name="confirmation_code"
                placeholder="Code"
                autocomplete="one-time-code"
                required
                type="text"
              ></base-input>
            </template>
          </base-label>
        </base-field-set>

        <base-footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onBackToSignInClicked="onBackToSignInClicked"
              :onSetupTOTPSubmit="onSetupTOTPSubmit"
            >
            </slot>
          </template>
          <base-button type="button" @click.prevent="onBackToSignInClicked">
            {{ backSignInText }}</base-button
          >
          <base-spacer />
          <base-button :disabled="actorState.matches('confirmSignIn.pending')">
            {{ confirmText }}
          </base-button>
        </base-footer>
        <base-box data-ui-error>
          {{ actorState.context.remoteError }}
        </base-box>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script lang="ts">
import { onMounted, defineComponent, reactive, toRefs, computed } from 'vue';

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
  CONFIRM_TEXT,
  SETUP_TOTP_TEXT,
} from '../defaults/DefaultTexts';

import { Auth, Logger } from 'aws-amplify';
import QRCode from 'qrcode';
import { SetupEventContext } from '../types';
import { getActorState } from '@aws-amplify/ui-core';

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
  setup(_, { emit, attrs }: SetupEventContext) {
    const { state, send } = useAuth();

    const {
      value: { context },
    } = state;
    const actorState = computed(() => getActorState(state.value));

    let qrCode = reactive({
      qrCodeImageSource: null,
      isLoading: true,
    });

    // lifecycle hooks

    onMounted(async () => {
      const logger = new Logger('SetupTOTP-logger');
      const { user } = context;
      if (!user) {
        return;
      }
      try {
        const secretKey = await Auth.setupTOTP(user);
        const issuer = 'AWSCognito';
        const totpCode = `otpauth://totp/${issuer}:${user.username}?secret=${secretKey}&issuer=${issuer}`;
        qrCode.qrCodeImageSource = await QRCode.toDataURL(totpCode);
      } catch (error) {
        logger.error(error);
      } finally {
        qrCode.isLoading = false;
      }
    });

    // Computed Properties
    const backSignInText = computed(() => BACK_SIGN_IN_TEXT);
    const confirmText = computed(() => CONFIRM_TEXT);
    const setupTOTPText = computed(() => SETUP_TOTP_TEXT);

    // Methods
    const onSetupTOTPSubmit = (e: Event): void => {
      if (attrs?.onConfirmSetupTOTPSubmit) {
        emit('confirmSetupTOTPSubmit', e);
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
      ...toRefs(qrCode),
      actorState,
      onSetupTOTPSubmit,
      onBackToSignInClicked,
      submit,
      backSignInText,
      confirmText,
      setupTOTPText,
    };
  },
});
</script>
