<template>
  <slot v-bind="$attrs" name="signUpSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form @input="onInput" @submit.prevent="onSignUpSubmit">
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
            <user-name-alias-component />
            <base-wrapper
              class=" amplify-flex amplify-field amplify-textfield amplify-passwordfield password-field"
              style="flex-direction: column"
            >
              <password-control
                name="password"
                :label="passwordLabel"
                autocomplete="new-password"
                :ariainvalid="
                  !!actorContext.validationError['confirm_password']
                "
              />
            </base-wrapper>
            <base-wrapper
              class=" amplify-flex amplify-field amplify-textfield amplify-passwordfield password-field"
              style="flex-direction: column"
            >
              <password-control
                name="confirm_password"
                :label="confirmPasswordLabel"
                autocomplete="new-password"
                :ariainvalid="
                  !!actorContext.validationError['confirm_password']
                "
              />
            </base-wrapper>
            <p
              data-variation="error"
              class="amplify-text"
              v-if="!!actorContext.validationError['confirm_password']"
            >
              {{ actorContext.validationError['confirm_password'] }}
            </p>

            <template v-for="(alias, idx) in secondaryAliases" :key="idx">
              <alias-control
                :label="translate(inputAttributes[alias].label)"
                :name="alias"
                :placeholder="translate(inputAttributes[alias].label)"
              />
            </template>

            <base-alert v-if="actorState.context.remoteError">
              {{ actorState.context.remoteError }}
            </base-alert>
            <base-button
              class="amplify-button amplify-field-group__control"
              data-fullwidth="true"
              data-loading="false"
              data-variation="primary"
              style="border-radius: 0px; font-weight: normal"
              :disabled="actorState.matches('signUp.submit')"
              >{{ createAccountLabel }}</base-button
            >
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
import {
  AuthInputAttributes,
  authInputAttributes,
  getActorState,
  getActorContext,
  SignUpState,
  SignUpContext,
  UserNameAlias,
  userNameAliasArray,
  translate,
} from '@aws-amplify/ui';

import PasswordControl from './password-control.vue';
import UserNameAliasComponent from './user-name-alias.vue';
import AliasControl from './alias-control.vue';
import FederatedSignIn from './federated-sign-in.vue';

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

const actorContext = computed(() =>
  getActorContext(state.value)
) as ComputedRef<SignUpContext>;

let [__, ...secondaryAliases] = useAliases(context?.config?.login_mechanisms);

secondaryAliases = secondaryAliases.filter(
  (alias: any): alias is UserNameAlias => userNameAliasArray.includes(alias)
);

// computed properties

const confirmPasswordLabel = computed(() => translate('Confirm Password'));
const passwordLabel = computed(() => translate('Password'));
const createAccountLabel = computed(() => translate('Create Account'));
const signUpButtonText = computed(() => translate('Create a new account'));
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
    submit(e);
  }
};

const submit = (e: Event): void => {
  send({
    type: 'SUBMIT',
  });
};
</script>
