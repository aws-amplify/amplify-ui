<template>
  <slot v-bind="$attrs" name="signInSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-signin
        @input="onInput"
        @submit.prevent="onSignInSubmit"
        method="post"
      >
        <template #formt="{ slotData }">
          <slot
            name="form"
            :info="slotData"
            :onSignInSubmit="onSignInSubmit"
            :onInput="onInput"
            :onCreateAccountClicked="onCreateAccountClicked"
            :onForgotPasswordClicked="onForgotPasswordClicked"
          >
          </slot>
        </template>
        <base-wrapper class="amplify-flex" style="flex-direction: column">
          <base-heading class="amplify-heading" :level="3">
            <template #headingI>
              <slot name="heading"></slot>
            </template>
            {{ signIntoAccountText }}
          </base-heading>
          <base-field-set
            :disabled="actorState.matches('signIn.submit')"
            class="amplify-flex"
            style="flex-direction: column"
          >
            <template #fieldSetI="{ slotData }">
              <slot name="signin-fields" :info="slotData"> </slot>
            </template>

            <user-name-alias :userNameAlias="true" />
            <base-wrapper
              class=" amplify-flex amplify-field amplify-textfield amplify-passwordfield password-field"
              style="flex-direction: column"
            >
              <password-control
                name="password"
                :label="passwordLabel"
                autocomplete="current-password"
                :ariainvalid="false"
              />
            </base-wrapper>
            <slot
              name="additional-fields"
              :onSignInSubmit="onSignInSubmit"
              :onCreateAccountClicked="onCreateAccountClicked"
            ></slot>
          </base-field-set>
          <base-alert v-if="actorState.context.remoteError">
            {{ actorState.context.remoteError }}
          </base-alert>

          <base-button
            :disabled="actorState.matches('signIn.submit')"
            class="amplify-button amplify-field-group__control"
            data-fullwidth="true"
            data-loading="false"
            data-variation="primary"
            style="border-radius: 0x; font-weight: normal"
          >
            <template #buttont>
              <slot
                name="sign-in-button"
                :onSignInSubmit="onSignInSubmit"
              ></slot>
            </template>
            {{
              actorState.matches('signIn.submit')
                ? signIngButtonText
                : signInButtonText
            }}
          </base-button>

          <slot
            name="forgot-password-section"
            :onForgotPasswordClicked="onForgotPasswordClicked"
          >
            <base-button
              class="amplify-button amplify-field-group__control"
              data-fullwidth="true"
              data-size="small"
              data-variation="link"
              style="font-weight: normal"
              type="button"
              @click.prevent="onForgotPasswordClicked"
            >
              {{ forgotYourPasswordLink }}
            </base-button>
          </slot>
        </base-wrapper>
        <base-footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onSignInSubmit="onSignInSubmit"
              :onCreateAccountClicked="onCreateAccountClicked"
            >
            </slot>
          </template>
          <federated-sign-in></federated-sign-in>
        </base-footer>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import { getActorState, SignInState, translate } from '@aws-amplify/ui';

import PasswordControl from './password-control.vue';
import UserNameAlias from './user-name-alias.vue';
import FederatedSignIn from './federated-sign-in.vue';

// @xstate
import { useAuth } from '../composables/useAuth';

const attrs = useAttrs();
const emit = defineEmits([
  'signInSubmit',
  'forgotPasswordClicked',
  'createAccountClicked',
]);

const passwordLabel = computed(() => translate('Password'));
const signIntoAccountText = computed(() =>
  translate('Sign in to your account')
);
const forgotYourPasswordLink = computed(() =>
  translate('Forgot your password? ')
);
const signInButtonText = computed(() => translate('Sign in'));
const signIngButtonText = computed(() => translate('Signing in'));

const { state, send } = useAuth();
const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<SignInState>;

// Methods

const onInput = (e: Event): void => {
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};

const onSignInSubmit = (e: Event): void => {
  if (attrs?.onSignInSubmit) {
    emit('signInSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  const formData = new FormData(<HTMLFormElement>e.target);
  send({
    type: 'SUBMIT',
    // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
    data: Object.fromEntries(formData),
  });
};

const onForgotPasswordClicked = (): void => {
  if (attrs?.onForgotPasswordClicked) {
    emit('forgotPasswordClicked');
  } else {
    send({ type: 'RESET_PASSWORD' });
  }
};

const onCreateAccountClicked = (): void => {
  if (attrs?.onCreateAccountClicked) {
    emit('createAccountClicked');
  } else {
    send({
      type: 'SIGN_UP',
    });
  }
};
</script>
