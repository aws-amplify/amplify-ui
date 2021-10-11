<template>
  <slot v-bind="$attrs" name="confirmResetPasswordSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-confirmResetpassword
        @submit.prevent="onConfirmResetPasswordSubmit"
        @change="onChange"
      >
        <base-field-set
          class="amplify-flex"
          style="flex-direction: column"
          :disabled="actorState.matches('confirmResetPassword.pending')"
        >
          <base-heading class="amplify-heading" :level="3">
            {{ confirmResetPasswordHeading }}
          </base-heading>
          <base-wrapper class="amplify-flex" style="flex-direction: column">
            <base-wrapper
              class="amplify-flex amplify-field amplify-textfield"
              style="flex-direction: column"
            >
              <base-label
                class="amplify-label sr-only"
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
              />
            </base-wrapper>
          </base-wrapper>
          <base-footer class="amplify-flex" style="flex-direction: column">
            <template #footert="{ slotData }">
              <slot
                name="footer"
                :info="slotData"
                :onConfirmResetPasswordSubmit="onConfirmResetPasswordSubmit"
              >
              </slot>
            </template>
            <base-button
              class="amplify-button amplify-field-group__control"
              data-fullwidth="false"
              data-variation="primary"
              type="submit"
              style="font-weight: normal"
              :disabled="actorState.matches('confirmResetPassword.pending')"
              >{{ confirmResetPasswordText }}</base-button
            >
            <base-button
              class="amplify-button amplify-field-group__control"
              data-fullwidth="false"
              data-size="small"
              data-variation="link"
              type="button"
              @click.prevent="onLostYourCodeClicked"
              style="font-weight: normal"
            >
              {{ resendCodeText }}
            </base-button>
          </base-footer>
        </base-field-set>
      </base-form>
    </base-wrapper>

    <base-box data-ui-error v-if="actorState?.context?.remoteError">
      {{ actorState?.context?.remoteError }}
    </base-box>
    <base-box
      data-ui-error
      v-if="!!actorContext.validationError['confirm_password']"
    >
      {{ actorContext.validationError['confirm_password'] }}
    </base-box>
  </slot>
</template>

<script setup lang="ts">
import { computed, ComputedRef, useAttrs, defineEmits } from 'vue';
import { I18n } from 'aws-amplify';
import { useAuth } from '../composables/useAuth';
import PasswordControl from './password-control.vue';

import {
  CONFIRM_RESET_PASSWORD_TEXT,
  RESEND_CODE_TEXT,
  CONFIRM_RESET_PASSWORD_HEADING,
  CONFIRMATION_CODE_TEXT,
  CODE_TEXT,
  NEW_PASSWORD_LABEL,
  CONFIRM_PASSWORD_LABEL,
} from '../defaults/DefaultTexts';

import {
  getActorContext,
  getActorState,
  ResetPasswordContext,
  ResetPasswordState,
} from '@aws-amplify/ui';
const { state, send } = useAuth();

const attrs = useAttrs();
const emit = defineEmits(['confirmResetPasswordSubmit', 'backToSignInClicked']);

const actorState: ComputedRef<ResetPasswordState> = computed(() =>
  getActorState(state.value)
) as ComputedRef<ResetPasswordState>;

const actorContext = computed(() =>
  getActorContext(state.value)
) as ComputedRef<ResetPasswordContext>;

// Computed Properties
const resendCodeText = computed(() => I18n.get(RESEND_CODE_TEXT));
const confirmationCodeText = computed(() => I18n.get(CONFIRMATION_CODE_TEXT));
const confirmResetPasswordHeading = computed(() =>
  I18n.get(CONFIRM_RESET_PASSWORD_HEADING)
);
const confirmResetPasswordText = computed(() =>
  I18n.get(CONFIRM_RESET_PASSWORD_TEXT)
);

const codeText = computed(() => I18n.get(CODE_TEXT));
const newPasswordLabel = computed(() => I18n.get(NEW_PASSWORD_LABEL));
const confirmPasswordLabel = computed(() => I18n.get(CONFIRM_PASSWORD_LABEL));

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

const onChange = (e: Event) => {
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    data: { name, value },
  });
};
</script>
