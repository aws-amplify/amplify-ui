<template>
  <slot v-bind="$attrs" name="signUpSlotI">
    <base-wrapper v-bind="$attrs" data-amplify-authenticator>
      <base-form @submit.prevent="onSignUpSubmit" @input="onInput">
        <base-wrapper class="amplify-flex" style="flex-direction: column">
          <base-heading class="amplify-heading" :level="3">
            <template #headingI>
              <slot name="heading"></slot>
            </template>
            {{ signUpButtonText }}
          </base-heading>
          <base-field-set
            class="amplify-flex"
            style="flex-direction: column"
            :disabled="actorState.matches('signUp.submit')"
          >
            <template #fieldSetI="{ slotData }">
              <slot name="signup-fields" :info="slotData"> </slot>
            </template>
            <base-wrapper
              class="amplify-flex amplify-field amplify-textfield"
              style="flex-direction: column"
            >
              <user-name-alias-component
                class="amplify-label sr-only"
                for="amplify-field-1220"
              />
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
                :label="passwordLabel"
                autocomplete="new-password"
              />
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
                name="confirm_password"
                :label="confirmPasswordLabel"
                autocomplete="new-password"
              />
            </base-wrapper>
            <base-box
              data-ui-error
              v-if="!!actorContext.validationError['confirm_password']"
            >
              {{ actorContext.validationError['confirm_password'] }}
            </base-box>

            <template v-for="(alias, idx) in secondaryAliases" :key="idx">
              <alias-control
                :label="inputAttributes[alias].label"
                :name="alias"
                :placeholder="inputAttributes[alias].label"
              />
            </template>

            <base-button
              class="amplify-button amplify-field-group__control"
              data-fullwidth="true"
              data-loading="false"
              data-variation="primary"
              style="border-radius: 0px; font-weight: normal"
              :disabled="actorState.matches('signUp.submit')"
              >{{ createAccountLabel }}</base-button
            >

            <base-box data-ui-error v-if="actorState.context.remoteError">
              {{ actorState.context.remoteError }}
            </base-box>
          </base-field-set>
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
            <federated-sign-in></federated-sign-in>
          </base-footer>
        </base-wrapper>
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
  getActorContext,
  SignUpState,
  SignUpContext,
  UserNameAlias,
  userNameAliasArray,
} from '@aws-amplify/ui';

import PasswordControl from './password-control.vue';
import UserNameAliasComponent from './user-name-alias.vue';
import AliasControl from './alias-control.vue';
import FederatedSignIn from './federated-sign-in.vue';

import {
  SIGN_IN_BUTTON_TEXT,
  HAVE_ACCOUNT_LABEL,
  CREATE_ACCOUNT_LABEL,
  SIGN_UP_BUTTON_TEXT,
  CONFIRM_PASSWORD_LABEL,
  PASSWORD_LABEL,
} from '../defaults/DefaultTexts';

import { useAuth } from '../composables/useAuth';
import { useAliases } from '../composables/useUtils';

const attrs = useAttrs();
const emit = defineEmits(['haveAccountClicked', 'signUpSubmit']);

const { signOut, user } = useAuth();

const {
  value: { context },
} = state;
const actorState: ComputedRef<SignUpState> = computed(() =>
  getActorState(state.value)
);

const actorContext = computed(() =>
  getActorContext(state.value)
) as ComputedRef<SignUpContext>;

let [__, ...secondaryAliases] = useAliases(context?.config?.login_mechanisms);

secondaryAliases = secondaryAliases.filter(
  (alias: any): alias is UserNameAlias => userNameAliasArray.includes(alias)
);

// computed properties

const confirmPasswordLabel = computed(() => I18n.get(CONFIRM_PASSWORD_LABEL));
const passwordLabel = computed(() => I18n.get(PASSWORD_LABEL));
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
