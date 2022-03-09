<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import {
  getActorContext,
  getActorState,
  SignInState,
  SignUpContext,
  translate,
  getFormDataFromEvent,
  FormField,
} from '@aws-amplify/ui';
import { propsCreator } from '../composables/useUtils';

import { useAuth, useAuthenticator } from '../composables/useAuth';

import PasswordControl from './password-control.vue';
import AuthenticatorForceNewPasswordFormFields from './authenticator-force-new-password-form-fields.vue';
import { createSharedComposable } from '@vueuse/core';

const attrs = useAttrs();
const emit = defineEmits(['haveAccountClicked', 'forceNewPasswordSubmit']);

const { state, send } = useAuth();

const {
  value: { context },
} = state;

const formOverrides = context?.config?.formFields
  ?.forceNewPassword as FormField;

const useAuthShared = createSharedComposable(useAuthenticator);
const props = useAuthShared();
const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<SignInState>;

const actorContext = computed(() =>
  getActorContext(state.value)
) as ComputedRef<SignUpContext>;

// computed properties
const changePasswordLabel = computed(() => translate('Change Password'));
const changingPasswordLabel = computed(() => translate('Changing'));
const backSignInText = computed(() => translate('Back to Sign In'));
const passwordLabel = computed(() => translate('Password'));
const confirmPasswordLabel = computed(() => translate('Confirm Password'));

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
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};

function onBlur(e: Event) {
  const { name } = <HTMLInputElement>e.target;
  props.updateBlur({ name });
}
</script>

<template>
  <slot v-bind="$attrs" name="forceNewPasswordI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-forcenewpassword
        @input="onInput"
        @submit.prevent="onForceNewPasswordSubmit"
      >
        <base-field-set
          class="amplify-flex"
          style="flex-direction: column"
          :disabled="actorState.matches('forceNewPassword.pending')"
        >
          <slot name="header">
            <base-heading :level="3" class="amplify-heading">
              {{ changePasswordLabel }}
            </base-heading>
          </slot>
          <base-wrapper class="amplify-flex" style="flex-direction: column">
            <!--Input 1-->
            <password-control
              v-bind="
                propsCreator('password', passwordLabel, formOverrides, true)
              "
              name="password"
              autocomplete="new-password"
              :ariainvalid="
                  !!(actorContext.validationError as Record<string,string>)['confirm_password']
                "
              @blur="onBlur"
            />

            <!--Input 2-->
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
                  !!(actorContext.validationError as Record<string,string>)['confirm_password']
                "
              @blur="onBlur"
            />
            <slot name="force-new-password-form-fields">
              <authenticator-force-new-password-form-fields />
            </slot>
          </base-wrapper>

          <base-footer class="amplify-flex" style="flex-direction: column">
            <base-box
              data-ui-error
              role="alert"
              data-variation="error"
              class="amplify-text"
              v-if="!!(actorContext.validationError as Record<string,string>)['confirm_password']"
            >
              {{ translate((actorContext.validationError as Record<string,string>)['confirm_password']) }}
            </base-box>
            <base-alert data-ui-error v-if="actorState.context.remoteError">
              {{ translate(actorState.context.remoteError) }}
            </base-alert>
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-loading="false"
              data-variation="primary"
              style="font-weight: normal"
              :disabled="actorState.matches('signUp.submit')"
              >{{
                actorState.matches('forceNewPassword.pending')
                  ? changingPasswordLabel + '&hellip;'
                  : changePasswordLabel
              }}</amplify-button
            >
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-size="small"
              data-variation="link"
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
