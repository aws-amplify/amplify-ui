<template>
  <slot v-bind="$attrs" name="confirmSetupTOTPI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-setup-totp
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
              <base-heading class="amplify-heading" :level="3">
                Setup TOTP
              </base-heading>
              <base-wrapper class="amplify-flex" style="flex-direction: column">
                <img
                  class="amplify-image"
                  data-amplify-qrcode
                  :src="qrCode.qrCodeImageSource"
                  alt="qr code"
                />
                <base-wrapper
                  class="amplify-flex amplify-field amplify-textfield"
                  style="flex-direction: column"
                >
                  <base-label
                    class="amplify-label sr-only"
                    for="amplify-field-45d1"
                    >Code *</base-label
                  >
                  <base-wrapper class="amplify-flex">
                    <base-input
                      class="amplify-input amplify-field-group__control"
                      id="amplify-field-45d1"
                      aria-invalid="false"
                      name="confirmation_code"
                      :placeholder="codeText"
                      autocomplete="one-time-code"
                      required
                      type="text"
                    ></base-input>
                  </base-wrapper>
                </base-wrapper>
              </base-wrapper>
              <base-footer class="amplify-flex" style="flex-direction: column">
                <template #footert="{ slotData }">
                  <slot
                    name="footer"
                    :info="slotData"
                    :onBackToSignInClicked="onBackToSignInClicked"
                    :onSetupTOTPSubmit="onSetupTOTPSubmit"
                  >
                  </slot>
                </template>
                <base-alert v-if="actorState.context?.remoteError">
                  {{ actorState.context.remoteError }}
                </base-alert>
                <base-button
                  class="amplify-button amplify-field-group__control"
                  data-fullwidth="false"
                  data-loading="false"
                  data-variation="primary"
                  type="submit"
                  style="font-weight: normal"
                  :disabled="actorState.matches('confirmSignIn.pending')"
                >
                  {{ confirmText }}
                </base-button>
                <base-button
                  class="amplify-button amplify-field-group__control"
                  data-fullwidth="false"
                  data-size="small"
                  data-variation="link"
                  style="font-weight: normal"
                  type="button"
                  @click.prevent="onBackToSignInClicked"
                >
                  {{ backSignInText }}</base-button
                >
              </base-footer>
            </base-wrapper>
          </template>
        </base-field-set>
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
import QRCode from 'qrcode';

import { Auth, Logger } from 'aws-amplify';
import { getActorState, SignInState, translate } from '@aws-amplify/ui';

import { useAuth } from '../composables/useAuth';

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
const backSignInText = computed(() => translate('Back to Sign In'));
const confirmText = computed(() => translate('Confirm'));
const setupTOTPText = computed(() => translate('Setup TOTP'));
const codeText = computed(() => translate('Code'));

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
