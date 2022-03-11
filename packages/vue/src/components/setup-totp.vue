<script setup lang="ts">
import { onMounted, reactive, computed, ComputedRef, useAttrs, ref } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import QRCode from 'qrcode';

import { Auth, Logger } from 'aws-amplify';
import {
  getActorState,
  getFormDataFromEvent,
  SignInState,
  translate,
} from '@aws-amplify/ui';

import { useAuth, useAuthenticator } from '../composables/useAuth';
import BaseFormFields from './primitives/base-form-fields.vue';

const useAuthShared = createSharedComposable(useAuthenticator);
const props = useAuthShared();

const attrs = useAttrs();
const emit = defineEmits(['confirmSetupTOTPSubmit', 'backToSignInClicked']);

const { state, send } = useAuth();
const {
  value: { context },
} = state;

const formOverrides = context?.config?.formFields?.setupTOTP;
const QROR = formOverrides?.['QR'];
const confOR = formOverrides?.['confirmation_code'];

const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<SignInState>;

let qrCode = reactive({
  qrCodeImageSource: '',
  isLoading: true,
});
let secretKey = ref('');
let copyTextLabel = ref(translate('COPY'));

function copyText() {
  navigator.clipboard.writeText(secretKey.value);
  copyTextLabel.value = translate('COPIED');
}

// lifecycle hooks

onMounted(async () => {
  const logger = new Logger('SetupTOTP-logger');
  const { user } = actorState.value.context;
  if (!user) {
    return;
  }
  try {
    secretKey.value = await Auth.setupTOTP(user);
    const issuer = QROR?.totpIssuer ?? 'AWSCognito';
    const username = QROR?.totpUsername ?? user.username;
    const totpCode = `otpauth://totp/${issuer}:${username}?secret=${secretKey.value}&issuer=${issuer}`;
    qrCode.qrCodeImageSource = await QRCode.toDataURL(totpCode);
  } catch (error) {
    logger.error(error);
  } finally {
    qrCode.isLoading = false;
  }
});

// Computed Properties
const backSignInText = computed(() => translate('Back to Sign In'));
const confirmText = computed(() => translate('Confirm'));
const codeText = computed(() => translate('Code'));

const label = confOR?.label ?? translate('Code *');
const labelHidden = confOR?.labelHidden;

// Methods
const onInput = (e: Event): void => {
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};

const onSetupTOTPSubmit = (e: Event): void => {
  if (attrs?.onConfirmSetupTOTPSubmit) {
    emit('confirmSetupTOTPSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  props.submitForm(getFormDataFromEvent(e));
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

<template>
  <slot v-bind="$attrs" name="confirmSetupTOTPI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-setup-totp
        @input="onInput"
        @submit.prevent="onSetupTOTPSubmit"
      >
        <base-field-set
          class="amplify-flex"
          style="flex-direction: column"
          :disabled="actorState.matches('confirmSignIn.pending')"
        >
          <template v-if="qrCode.isLoading">
            <p>Loading...</p>
          </template>
          <template v-else>
            <base-wrapper class="amplify-flex" style="flex-direction: column">
              <slot name="header">
                <base-heading class="amplify-heading" :level="3">
                  Setup TOTP
                </base-heading>
              </slot>

              <base-wrapper class="amplify-flex" style="flex-direction: column">
                <img
                  class="amplify-image"
                  data-amplify-qrcode
                  :src="qrCode.qrCodeImageSource"
                  alt="qr code"
                  width="228"
                  height="228"
                />
                <base-wrapper class="amplify-flex" data-amplify-copy>
                  <div>{{ secretKey }}</div>
                  <base-wrapper data-amplify-copy-svg @click="copyText">
                    <div data-amplify-copy-tooltip>{{ copyTextLabel }}</div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM15 5H8C6.9 5 6.01 5.9 6.01 7L6 21C6 22.1 6.89 23 7.99 23H19C20.1 23 21 22.1 21 21V11L15 5ZM8 21V7H14V12H19V21H8Z"
                      />
                    </svg>
                  </base-wrapper>
                </base-wrapper>
                <base-form-fields route="setupTOTP"></base-form-fields>
              </base-wrapper>
              <base-footer class="amplify-flex" style="flex-direction: column">
                <base-alert v-if="actorState.context?.remoteError">
                  {{ translate(actorState.context.remoteError) }}
                </base-alert>
                <amplify-button
                  class="amplify-field-group__control"
                  data-fullwidth="false"
                  data-loading="false"
                  data-variation="primary"
                  type="submit"
                  style="font-weight: normal"
                  :disabled="actorState.matches('confirmSignIn.pending')"
                >
                  {{ confirmText }}
                </amplify-button>
                <amplify-button
                  class="amplify-field-group__control"
                  data-fullwidth="false"
                  data-size="small"
                  data-variation="link"
                  style="font-weight: normal"
                  type="button"
                  @click.prevent="onBackToSignInClicked"
                >
                  {{ backSignInText }}</amplify-button
                >
                <slot
                  name="footer"
                  :onBackToSignInClicked="onBackToSignInClicked"
                  :onSetupTOTPSubmit="onSetupTOTPSubmit"
                >
                </slot>
              </base-footer>
            </base-wrapper>
          </template>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>
