<template>
  <slot v-bind="$attrs" name="resetPasswordSlotI">
    <base-form
      v-bind="$attrs"
      data-amplify-authenticator-resetpassword
      @submit.prevent="onResetPasswordSubmit"
      @change="onChange"
    >
      <base-wrapper class="amplify-flex" style="flex-direction: column">
        <base-heading class="amplify-heading" :level="3">
          {{ resetPasswordHeading }}
        </base-heading>
        <base-field-set
          class="amplify-flex"
          style="flex-direction: column"
          :disabled="actorState.matches('resetPassword.pending')"
        >
          <base-wrapper
            class="amplify-flex amplify-field amplify-textfield"
            style="flex-direction: column"
          >
            <base-label class="amplify-label sr-only" for="amplify-field-7dce">
              Username
            </base-label>
            <base-wrapper class="amplify-flex">
              <base-input
                class="amplify-input amplify-field-group__control"
                id="amplify-field-7dce"
                aria-invalid="false"
                name="username"
                :placeholder="enterUsernameText"
                autocomplete="username"
                required
                type="username"
              ></base-input>
            </base-wrapper>
          </base-wrapper>
        </base-field-set>

        <base-footer
          class="amplify-flex"
          style="flex-direction: column; align-items: unset"
        >
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onBackToSignInClicked="onBackToSignInClicked"
              :onResetPasswordSubmit="onResetPasswordSubmit"
            >
            </slot>
          </template>
          <base-button
            class="amplify-button amplify-field-group__control"
            data-fullwidth="false"
            data-variation="primary"
            type="submit"
            style="font-weight: normal"
            :disabled="actorState.matches('resetPassword.pending')"
            >{{ resetPasswordText }}</base-button
          >
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
        <base-box data-ui-error v-if="actorState?.context?.remoteError">
          {{ actorState?.context?.remoteError }}
        </base-box>
      </base-wrapper>
    </base-form>
  </slot>
</template>

<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import { I18n } from 'aws-amplify';
import { useAuth } from '../composables/useAuth';

import {
  BACK_SIGN_IN_TEXT,
  RESET_PASSWORD_HEADING,
  RESET_PASSWORD_TEXT,
  ENTER_USERNAME_TEXT,
} from '../defaults/DefaultTexts';
import { getActorState, ResetPasswordState } from '@aws-amplify/ui';

const attrs = useAttrs();
const emit = defineEmits(['resetPasswordSubmit', 'backToSignInClicked']);

const { signOut, user } = useAuth();
const actorState: ComputedRef<ResetPasswordState> = computed(() =>
  getActorState(state.value)
) as ComputedRef<ResetPasswordState>;

// Computed Properties
const backSignInText = computed(() => I18n.get(BACK_SIGN_IN_TEXT));
const resetPasswordHeading = computed(() => I18n.get(RESET_PASSWORD_HEADING));
const resetPasswordText = computed(() => I18n.get(RESET_PASSWORD_TEXT));
const enterUsernameText = computed(() => I18n.get(ENTER_USERNAME_TEXT));

// Methods
const onResetPasswordSubmit = (e: Event): void => {
  if (attrs?.onResetPasswordSubmit) {
    emit('resetPasswordSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  const formData = new FormData(<HTMLFormElement>e.target);
  send({
    type: 'SUBMIT',
    data: Object.fromEntries(formData),
  });
};

const onChange = (e: Event): void => {
  const { name, value } = <HTMLFormElement>e.target;
  send({
    type: 'CHANGE',
    data: { name, value },
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
