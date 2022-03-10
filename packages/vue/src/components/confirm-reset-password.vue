<script setup lang="ts">
import { computed, ComputedRef, useAttrs, defineEmits } from 'vue';
import {
  getActorContext,
  getActorState,
  ResetPasswordContext,
  ResetPasswordState,
  ValidationError,
  translate,
  getFormDataFromEvent,
  FormField,
} from '@aws-amplify/ui';
import { propsCreator } from '../composables/useUtils';

import { useAuth, useAuthenticator } from '../composables/useAuth';
import PasswordControl from './password-control.vue';
import { createSharedComposable } from '@vueuse/core';

const { state, send } = useAuth();

const {
  value: { context },
} = state;

const formOverrides = context?.config?.formFields
  ?.confirmResetPassword as FormField;
const confOR = formOverrides?.['confirmation_code'];

const useAuthShared = createSharedComposable(useAuthenticator);
const props = useAuthShared();

const attrs = useAttrs();
const emit = defineEmits(['confirmResetPasswordSubmit', 'backToSignInClicked']);

const actorState: ComputedRef<ResetPasswordState> = computed(() =>
  getActorState(state.value)
) as ComputedRef<ResetPasswordState>;

const actorContext = computed(() =>
  getActorContext(state.value)
) as ComputedRef<ResetPasswordContext>;

// Computed Properties
const resendCodeText = computed(() => translate('Resend Code'));
const confirmationCodeText = computed(() => translate('Confirmation Code'));
const confirmResetPasswordHeading = computed(() =>
  translate('Reset your Password')
);
const confirmResetPasswordText = computed(() => translate('Submit'));

const codeText = computed(() => translate('Code'));
const newPasswordLabel = computed(() => translate('New password'));
const confirmPasswordLabel = computed(() => translate('Confirm Password'));

const label = confOR?.label ?? confirmationCodeText;
const labelHidden = confOR?.labelHidden;

// Methods
const onConfirmResetPasswordSubmit = (e: Event): void => {
  if (attrs?.onConfirmResetPasswordSubmit) {
    emit('confirmResetPasswordSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  props.submitForm(getFormDataFromEvent(e));
};

const onLostYourCodeClicked = (): void => {
  send({
    type: 'RESEND',
  });
};

const onInput = (e: Event) => {
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    data: { name, value },
  });
};

function onBlur(e: Event) {
  const { name } = <HTMLInputElement>e.target;
  props.updateBlur({ name });
}
</script>

<template>
  <slot v-bind="$attrs" name="confirmResetPasswordSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-confirmResetpassword
        @input="onInput"
        @submit.prevent="onConfirmResetPasswordSubmit"
      >
        <base-field-set
          class="amplify-flex"
          style="flex-direction: column"
          :disabled="actorState.matches('confirmResetPassword.pending')"
        >
          <slot name="header">
            <base-heading class="amplify-heading" :level="3">
              {{ confirmResetPasswordHeading }}
            </base-heading>
          </slot>

          <base-wrapper class="amplify-flex" style="flex-direction: column">
            <base-wrapper
              class="amplify-flex amplify-field amplify-textfield"
              style="flex-direction: column"
            >
              <base-label
                class="amplify-label"
                :class="{ 'amplify-visually-hidden': labelHidden ?? true }"
                for="amplify-field-d653"
              >
                {{ label }}
              </base-label>
              <base-wrapper class="amplify-flex">
                <base-input
                  :placeholder="confOR?.placeholder ?? codeText"
                  :required="confOR?.required ?? true"
                  class="amplify-input amplify-field-group__control"
                  id="amplify-field-d653"
                  aria-invalid="false"
                  autocomplete="one-time-code"
                  name="confirmation_code"
                  type="number"
                ></base-input>
              </base-wrapper>
            </base-wrapper>

            <password-control
              v-bind="
                propsCreator('password', newPasswordLabel, formOverrides, true)
              "
              name="password"
              autocomplete="current-password"
              :ariainvalid="
                  !!(actorContext.validationError as ValidationError)['confirm_password']
                "
              @blur="onBlur"
            />

            <password-control
              v-bind="
                propsCreator(
                  'confirm_password',
                  confirmPasswordLabel,
                  formOverrides,
                  true
                )
              "
              name="confirm_password"
              autocomplete="new-password"
              :ariainvalid="
                  !!(actorContext.validationError as ValidationError)['confirm_password']
                "
              @blur="onBlur"
            />
          </base-wrapper>
          <base-footer class="amplify-flex" style="flex-direction: column">
            <base-box
              data-ui-error
              data-variation="error"
              role="alert"
              class="amplify-text"
              v-if="!!(actorContext.validationError as ValidationError)['confirm_password']"
            >
              {{ translate(actorContext.validationError?.confirm_password as string) }}
            </base-box>
            <base-alert v-if="actorState?.context?.remoteError">
              {{ translate(actorState?.context?.remoteError) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-variation="primary"
              type="submit"
              style="font-weight: normal"
              :disabled="actorState.matches('confirmResetPassword.pending')"
              >{{ confirmResetPasswordText }}</amplify-button
            >
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-size="small"
              data-variation="link"
              type="button"
              @click.prevent="onLostYourCodeClicked"
              style="font-weight: normal"
            >
              {{ resendCodeText }}
            </amplify-button>
            <slot
              name="footer"
              :onConfirmResetPasswordSubmit="onConfirmResetPasswordSubmit"
              :onLostYourCodeClicked="onLostYourCodeClicked"
            >
            </slot>
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>
  </slot>
</template>
