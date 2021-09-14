<template>
  <slot v-bind="$attrs" name="confirmSetupTOTPI">
    <base-wrapper v-bind="$attrs" data-amplify-wrapper>
      <base-form
        data-amplify-authenticator-setup-totp
        @submit.prevent="onSetupTOTPSubmit"
      >
        <base-heading>
          {{ setupTOTPText }}
        </base-heading>
        <base-field-set :disabled="actorState.matches('confirmSignIn.pending')">
          <base-label data-amplify-confirmationcode>
            <template v-if="qrCode.isLoading">
              <p>Loading...</p>
            </template>
            <template v-else>
              <img
                data-amplify-qrcode
                :src="qrCode.qrCodeImageSource"
                alt="qr code"
              />
              <base-text>Code *</base-text>
              <base-input
                name="confirmation_code"
                :placeholder="codeText"
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

<script setup lang="ts">
import {
  onMounted,
  reactive,
  toRefs,
  computed,
  ComputedRef,
  useAttrs,
} from 'vue';

import { I18n } from 'aws-amplify';

import { useAuth } from '../composables/useAuth';

import {
  BACK_SIGN_IN_TEXT,
  CONFIRM_TEXT,
  SETUP_TOTP_TEXT,
  CODE_TEXT,
} from '../defaults/DefaultTexts';

import { Auth, Logger } from 'aws-amplify';
import QRCode from 'qrcode';
import { getActorState, SignInState } from '@aws-amplify/ui';

const attrs = useAttrs();
const emit = defineEmits(['confirmSetupTOTPSubmit', 'backToSignInClicked']);

const { state, send } = useAuth();
const actorState: ComputedRef<SignInState> = computed(() =>
  getActorState(state.value)
);

let qrCode = reactive({
  qrCodeImageSource: null,
  isLoading: true,
});

// lifecycle hooks

onMounted(async () => {
  const logger = new Logger('SetupTOTP-logger');
  const { user } = actorState.value.context;
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
const backSignInText = computed(() => I18n.get(BACK_SIGN_IN_TEXT));
const confirmText = computed(() => I18n.get(CONFIRM_TEXT));
const setupTOTPText = computed(() => I18n.get(SETUP_TOTP_TEXT));
const codeText = computed(() => I18n.get(CODE_TEXT));

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
</script>
