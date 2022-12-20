<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import {
  authenticatorTextUtil,
  getActorState,
  SignInState,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';

import { useAuth, useAuthenticator } from '../composables/useAuth';

import AuthenticatorForceNewPasswordFormFields from './authenticator-force-new-password-form-fields.vue';
import { createSharedComposable } from '@vueuse/core';

const attrs = useAttrs();
const emit = defineEmits(['haveAccountClicked', 'forceNewPasswordSubmit']);

const { state, send } = useAuth();

const useAuthShared = createSharedComposable(useAuthenticator);
const props = useAuthShared();
const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<SignInState>;

// Text Util
const { getChangePasswordText, getChangingText, getBackToSignInText } =
  authenticatorTextUtil;

// Computed Properties
const changePasswordLabel = computed(() => getChangePasswordText());
const changingPasswordLabel = computed(() => getChangingText());
const backSignInText = computed(() => getBackToSignInText());

// Methods
const onHaveAccountClicked = (): void => {
  if (attrs?.onHaveAccountClicked) {
    emit('haveAccountClicked');
  } else {
    send({
      type: 'SIGN_IN',
    });
  }
};

const onForceNewPasswordSubmit = (e: Event): void => {
  if (attrs?.onForceNewPasswordSubmit) {
    emit('forceNewPasswordSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  props.submitForm(getFormDataFromEvent(e));
};

const onInput = (e: Event): void => {
  const { name, value } = e.target as HTMLInputElement;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};

function onBlur(e: Event) {
  const { name } = e.target as HTMLInputElement;
  props.updateBlur({ name });
}
</script>

<template>
  <slot v-bind="$attrs" name="forceNewPasswordI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-forcenewpassword
        @input="onInput"
        @blur.capture="onBlur"
        @submit.prevent="onForceNewPasswordSubmit"
      >
        <base-field-set
          class="amplify-flex amplify-authenticator__column"
          :disabled="actorState.matches('forceNewPassword.pending')"
        >
          <slot name="header">
            <base-heading :level="3" class="amplify-heading">
              {{ changePasswordLabel }}
            </base-heading>
          </slot>
          <base-wrapper class="amplify-flex amplify-authenticator__column">
            <slot name="force-new-password-form-fields">
              <authenticator-force-new-password-form-fields />
            </slot>
          </base-wrapper>

          <base-footer class="amplify-flex amplify-authenticator__column">
            <base-alert data-ui-error v-if="actorState.context.remoteError">
              {{ translate(actorState.context.remoteError) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control amplify-authenticator__font"
              :fullwidth="false"
              :loading="false"
              :variation="'primary'"
              style="font-weight: normal"
              :disabled="actorState.matches('signUp.submit')"
              >{{
                actorState.matches('forceNewPassword.pending')
                  ? changingPasswordLabel + '&hellip;'
                  : changePasswordLabel
              }}</amplify-button
            >
            <amplify-button
              class="amplify-field-group__control amplify-authenticator__font"
              :fullwidth="false"
              :size="'small'"
              :variation="'link'"
              style="font-weight: normal"
              type="button"
              @click.prevent="onHaveAccountClicked"
            >
              {{ backSignInText }}</amplify-button
            >
            <slot
              name="footer"
              :onHaveAccountClicked="onHaveAccountClicked"
              :onForceNewPasswordSubmit="onForceNewPasswordSubmit"
            >
            </slot>
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>
