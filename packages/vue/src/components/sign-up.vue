<template>
  <slot v-bind="$attrs" name="signUpSlotI">
    <base-wrapper v-bind="$attrs" data-amplify-wrapper>
      <base-form @submit.prevent="onSignUpSubmit" @input="onInput">
        <base-heading>
          <template #headingI>
            <slot name="heading"></slot>
          </template>
          {{ signUpButtonText }}
        </base-heading>
        <federated-sign-in></federated-sign-in>
        <base-field-set :disabled="actorState.matches('signUp.submit')">
          <template #fieldSetI="{ slotData }">
            <slot name="signup-fields" :info="slotData"> </slot>
          </template>
          <user-name-alias class="amplify-label" for="amplify-field-1220" />
          <sign-up-password-control />
          <sign-up-confirm-password-control />
          <template v-for="(alias, idx) in secondaryAliases" :key="idx">
            <alias-control
              :label="inputAttributes[alias].label"
              :name="alias"
              :placeholder="inputAttributes[alias].placeholder"
            />
          </template>
        </base-field-set>
        <base-spacer />

        <base-box data-ui-error>
          {{ actorState.context.remoteError }}
        </base-box>

        <base-footer>
          <template #footert="{ slotData }">
            <slot
              name="footer"
              :info="slotData"
              :onHaveAccountClicked="onHaveAccountClicked"
              :onSignUpSubmit="onSignUpSubmit"
            >
            </slot>
          </template>
          <slot name="footer-left" :onHaveAccountClicked="onHaveAccountClicked">
            <base-text>{{ haveAccountLabel }}</base-text>
            <base-button type="button" @click.prevent="onHaveAccountClicked">
              {{ signInButtonText }}</base-button
            >
          </slot>
          <slot name="footer-right" :onSignUpSubmit="onSignUpSubmit">
            <base-button :disabled="actorState.matches('signUp.submit')">{{
              createAccountLabel
            }}</base-button>
          </slot>
        </base-footer>
      </base-form>
    </base-wrapper>
  </slot>
</template>

<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import { I18n } from 'aws-amplify';
import {
  AuthInputAttributes,
  authInputAttributes,
  getActorState,
  LoginMechanism,
  SignUpState,
  socialProviderLoginMechanisms,
} from '@aws-amplify/ui';

import SignUpPasswordControl from './sign-up-password-control.vue';
import SignUpConfirmPasswordControl from './sign-up-confirm-password-control.vue';
import UserNameAlias from './user-name-alias.vue';
import AliasControl from './alias-control.vue';
import FederatedSignIn from './federated-sign-in.vue';

import {
  SIGN_IN_BUTTON_TEXT,
  HAVE_ACCOUNT_LABEL,
  CREATE_ACCOUNT_LABEL,
  SIGN_UP_BUTTON_TEXT,
} from '../defaults/DefaultTexts';

import { useAuth } from '../composables/useAuth';
import { useAliases } from '../composables/useUtils';

const attrs = useAttrs();
const emit = defineEmits(['haveAccountClicked', 'signUpSubmit']);

const { state, send } = useAuth();

const {
  value: { context },
} = state;
const actorState: ComputedRef<SignUpState> = computed(() =>
  getActorState(state.value)
);

let [__, ...secondaryAliases] = useAliases(context?.config?.login_mechanisms);

secondaryAliases = secondaryAliases.filter(
  (alias) =>
    !([...socialProviderLoginMechanisms] as LoginMechanism[]).includes(alias)
);

// computed properties

const signInButtonText = computed(() => I18n.get(SIGN_IN_BUTTON_TEXT));
const haveAccountLabel = computed(() => I18n.get(HAVE_ACCOUNT_LABEL));
const createAccountLabel = computed(() => I18n.get(CREATE_ACCOUNT_LABEL));
const signUpButtonText = computed(() => I18n.get(SIGN_UP_BUTTON_TEXT));
const inputAttributes: ComputedRef<AuthInputAttributes> = computed(
  () => authInputAttributes
);

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

const onInput = (e: Event): void => {
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};
const onSignUpSubmit = (e: Event): void => {
  if (attrs?.onSignUpSubmit) {
    emit('signUpSubmit', e);
  } else {
    submit();
  }
};

const submit = (): void => {
  send({
    type: 'SUBMIT',
  });
};
</script>
