<script setup lang="ts">
import { computed, ComputedRef, useAttrs, defineEmits } from 'vue';
import {
  getActorContext,
  getActorState,
  ResetPasswordContext,
  ResetPasswordState,
  ValidationError,
  translate,
} from '@aws-amplify/ui';

import { useAuth, useAuthenticator } from '../composables/useAuth';
import PasswordControl from './password-control.vue';

const { state, send } = useAuth();
const props = useAuthenticator();

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
                class="sr-only amplify-label"
                for="amplify-field-d653"
              >
                {{ confirmationCodeText }}
              </base-label>
              <base-wrapper class="amplify-flex">
                <base-input
                  class="amplify-input amplify-field-group__control"
                  id="amplify-field-d653"
                  aria-invalid="false"
                  autocomplete="one-time-code"
                  :placeholder="codeText"
                  name="confirmation_code"
                  required
                  type="number"
                ></base-input>
              </base-wrapper>
            </base-wrapper>
            <base-wrapper
              class="
                amplify-flex
                amplify-field
                amplify-textfield
                amplify-passwordfield
                password-field
              "
              style="flex-direction: column"
            >
              <password-control
                name="password"
                :label="newPasswordLabel"
                autocomplete="current-password"
                :ariainvalid="
                  !!(actorContext.validationError as ValidationError)['confirm_password']
                "
                @blur="onBlur"
              />
            </base-wrapper>
            <base-wrapper
              class="
                amplify-flex
                amplify-field
                amplify-textfield
                amplify-passwordfield
              "
              style="flex-direction: column"
            >
              <password-control
                name="confirm_password"
                :label="confirmPasswordLabel"
                autocomplete="new-password"
                :ariainvalid="
                  !!(actorContext.validationError as ValidationError)['confirm_password']
                "
                @blur="onBlur"
              />
            </base-wrapper>
          </base-wrapper>
          <base-footer class="amplify-flex" style="flex-direction: column">
            <base-box
              data-ui-error
              data-variation="error"
              role="alert"
              class="amplify-text"
              v-if="!!(actorContext.validationError as ValidationError)['confirm_password']"
            >
              {{ (actorContext.validationError as ValidationError)['confirm_password'] }}
            </base-box>
            <base-alert v-if="actorState?.context?.remoteError">
              {{ actorState?.context?.remoteError }}
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
