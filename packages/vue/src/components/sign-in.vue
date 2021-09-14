<template>
  <slot v-bind="$attrs" name="signInSlotI">
    <base-wrapper v-bind="$attrs" data-amplify-wrapper>
      <base-form
        data-amplify-authenticator-signin
        @submit.prevent="onSignInSubmit"
        @input="onInput"
        method="post"
      >
        <template #formt="{ slotData }">
          <slot
            name="form"
            :info="slotData"
            :onSignInSubmit="onSignInSubmit"
            :onCreateAccountClicked="onCreateAccountClicked"
            :onForgotPasswordClicked="onForgotPasswordClicked"
          >
          </slot>
        </template>
        <base-wrapper>
          <base-heading class="amplify-heading" :level="3">
            <template #headingI>
              <slot name="heading"></slot>
            </template>
            {{ signIntoAccountText }}
          </base-heading>
          <federated-sign-in></federated-sign-in>
          <base-field-Set :disabled="actorState.matches('signIn.submit')">
            <template #fieldSetI="{ slotData }">
              <slot name="signin-fields" :info="slotData"> </slot>
            </template>
            <user-name-alias data-amplify-usernamealias :userNameAlias="true" />

            <base-label data-amplify-password>
              <sign-in-password-control />

              <base-box>
                <slot
                  name="forgot-password-section"
                  :onForgotPasswordClicked="onForgotPasswordClicked"
                >
                  <base-button
                    type="button"
                    @click.prevent="onForgotPasswordClicked"
                  >
                    {{ forgotYourPasswordLink }}
                  </base-button>
                </slot>
              </base-box>
            </base-label>
            <slot
              name="additional-fields"
              :onSignInSubmit="onSignInSubmit"
              :onCreateAccountClicked="onCreateAccountClicked"
            ></slot>
          </base-field-Set>
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
            <base-text>{{ noAccount }}</base-text>
            <base-button
              type="button"
              @click.prevent="onCreateAccountClicked"
              >{{ createAccountLink }}</base-button
            >
            <base-spacer />
            <base-button :disabled="actorState.matches('signIn.submit')">
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
              <!-- Add prop too? -->
            </base-button>
          </base-footer>
          <base-box data-ui-error>
            {{ actorState.context.remoteError }}
          </base-box>
        </base-wrapper>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import { I18n } from 'aws-amplify';

import SignInPasswordControl from './sign-in-password-control.vue';
import UserNameAlias from './user-name-alias.vue';
import FederatedSignIn from './federated-sign-in.vue';

import {
  SIGN_IN_TEXT,
  NO_ACCOUNT,
  CREATE_ACCOUNT_LINK,
  FORGOT_YOUR_PASSWORD_LINK,
  SIGN_IN_BUTTON_TEXT,
  SIGNING_IN_BUTTON_TEXT,
} from '../defaults/DefaultTexts';

// @xstate
import { useAuth } from '../composables/useAuth';
import { getActorState, SignInState } from '@aws-amplify/ui';

const attrs = useAttrs();
const emit = defineEmits([
  'signInSubmit',
  'forgotPasswordClicked',
  'createAccountClicked',
]);

const signIntoAccountText = computed(() => I18n.get(SIGN_IN_TEXT));
const noAccount = computed(() => I18n.get(NO_ACCOUNT));
const createAccountLink = computed(() => I18n.get(CREATE_ACCOUNT_LINK));
const forgotYourPasswordLink = computed(() =>
  I18n.get(FORGOT_YOUR_PASSWORD_LINK)
);
const signInButtonText = computed(() => I18n.get(SIGN_IN_BUTTON_TEXT));
const signIngButtonText = computed(() => I18n.get(SIGNING_IN_BUTTON_TEXT));

const { state, send } = useAuth();
const actorState: ComputedRef<SignInState> = computed(() =>
  getActorState(state.value)
);

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
