<script setup lang="ts">
import { computed, toRefs, useAttrs } from 'vue';
import {
  authenticatorTextUtil,
  getFormDataFromEvent,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '../composables/useAuth';
import { UseAuthenticator } from '../types';

import AuthenticatorForceNewPasswordFormFields from './authenticator-force-new-password-form-fields.vue';

/** @deprecated Component events are deprecated and not maintained. */
const emit = defineEmits(['haveAccountClicked', 'forceNewPasswordSubmit']);
const attrs = useAttrs();

// `facade` is manually typed to `UseAuthenticator` for temporary type safety.
const facade: UseAuthenticator = useAuthenticator();

const { submitForm, toSignIn, updateBlur, updateForm } = facade;
const { error, isPending } = toRefs(facade);

// Text Util
const { getChangePasswordText, getChangingText, getBackToSignInText } =
  authenticatorTextUtil;

// Computed Properties
const changePasswordLabel = computed(() => getChangePasswordText());
const changingPasswordLabel = computed(() => getChangingText());
const backSignInText = computed(() => getBackToSignInText());

// Methods
const onHaveAccountClicked = (): void => {
  // TODO(BREAKING): remove unused emit
  // istanbul ignore next
  if (attrs?.onHaveAccountClicked) {
    emit('haveAccountClicked');
  } else {
    toSignIn();
  }
};

const onForceNewPasswordSubmit = (e: Event): void => {
  // TODO(BREAKING): remove unused emit
  // istanbul ignore next
  if (attrs?.onForceNewPasswordSubmit) {
    emit('forceNewPasswordSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  submitForm(getFormDataFromEvent(e));
};

const onInput = (e: Event): void => {
  const { name, value } = e.target as HTMLInputElement;
  updateForm({ name, value });
};

function onBlur(e: Event) {
  const { name } = e.target as HTMLInputElement;
  updateBlur({ name });
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
          :disabled="isPending"
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
            <base-alert data-ui-error v-if="error">
              {{ translate(error) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control amplify-authenticator__font"
              :fullwidth="false"
              :loading="false"
              :variation="'primary'"
              style="font-weight: normal"
              :disabled="isPending"
            >
              {{
                isPending
                  ? changingPasswordLabel + '&hellip;'
                  : changePasswordLabel
              }}
            </amplify-button>
            <amplify-button
              class="amplify-field-group__control amplify-authenticator__font"
              :fullwidth="false"
              :size="'small'"
              :variation="'link'"
              style="font-weight: normal"
              type="button"
              @click.prevent="onHaveAccountClicked"
            >
              {{ backSignInText }}
            </amplify-button>
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
