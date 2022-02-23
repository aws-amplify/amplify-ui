<script setup lang="ts">
import { computed, ComputedRef, toRefs } from 'vue';
import {
  translate,
  LoginMechanism,
  AuthInputAttributes,
  authInputAttributes,
  SignUpAttribute,
} from '@aws-amplify/ui';

import { useAuth, useAuthenticator } from '../composables/useAuth';
import UserNameAliasComponent from './user-name-alias.vue';
import PasswordControl from './password-control.vue';
import AliasControl from './alias-control.vue';
import { createSharedComposable } from '@vueuse/core';

// state
const { state } = useAuth();

const {
  value: { context },
} = state;

const formOverrides = context?.config?.formFields?.signUp;

const useAuthShared = createSharedComposable(useAuthenticator);
const { validationErrors } = toRefs(useAuthShared());
const props = useAuthShared();

const inputAttributes: ComputedRef<AuthInputAttributes> = computed(
  () => authInputAttributes
);

// computed properties
const passwordLabel = computed(() => translate('Password'));
const confirmPasswordLabel = computed(() => translate('Confirm Password'));

let fieldNames: Array<LoginMechanism | SignUpAttribute>;
let loginMechanisms = context.config?.loginMechanisms as LoginMechanism[];
let signUpAttributes = context.config?.signUpAttributes as SignUpAttribute[];

fieldNames = Array.from(new Set([...loginMechanisms, ...signUpAttributes]));

fieldNames = fieldNames.filter((fieldName) => {
  const hasDefaultField = !!authInputAttributes[fieldName as LoginMechanism];
  if (!hasDefaultField) {
    console.debug(
      `Authenticator does not have a default implementation for ${fieldName}. Customize the authenticator sign-up-fields slot to add your own.`
    );
  }
  return hasDefaultField;
});

function onBlur(e: Event) {
  const { name } = <HTMLInputElement>e.target;
  props.updateBlur({ name });
}

// Only 1 is supported, so `['email', 'phone_number']` will only show `email`
const loginMechanism = fieldNames.shift() as LoginMechanism;
</script>

<template>
  <user-name-alias-component
    :label-hidden="formOverrides?.[loginMechanism]?.labelHidden"
    :userName="loginMechanism"
    :placeholder="formOverrides?.[loginMechanism]?.placeholder"
    :required="formOverrides?.[loginMechanism]?.required"
    :label="formOverrides?.[loginMechanism]?.label"
    :dialCode="formOverrides?.[loginMechanism]?.dialCode"
    :dialCodeList="formOverrides?.[loginMechanism]?.dialCodeList"
  />
  <base-wrapper
    class="
      amplify-flex amplify-field amplify-textfield amplify-passwordfield
      password-field
    "
    style="flex-direction: column"
  >
    <password-control
      name="password"
      :label-hidden="formOverrides?.['password']?.labelHidden"
      :placeholder="formOverrides?.['password']?.placeholder"
      :required="formOverrides?.['password']?.required"
      :label="formOverrides?.['password']?.label ?? passwordLabel"
      autocomplete="new-password"
      :ariainvalid="!!validationErrors.confirm_password"
      @blur="onBlur"
    />
  </base-wrapper>
  <base-wrapper
    class="
      amplify-flex amplify-field amplify-textfield amplify-passwordfield
      password-field
    "
    style="flex-direction: column"
  >
    <password-control
      name="confirm_password"
      :label="
        formOverrides?.['confirm_password']?.label ?? confirmPasswordLabel
      "
      :label-hidden="formOverrides?.['confirm_password']?.labelHidden"
      :placeholder="formOverrides?.['confirm_password']?.placeholder"
      :required="formOverrides?.['confirm_password']?.required"
      autocomplete="new-password"
      :ariainvalid="!!validationErrors.confirm_password"
      @blur="onBlur"
    />
  </base-wrapper>
  <p
    role="alert"
    data-variation="error"
    class="amplify-text"
    v-if="!!validationErrors.confirm_password"
  >
    {{ translate(validationErrors.confirm_password) }}
  </p>

  <template v-for="(field, idx) in fieldNames" :key="idx">
    <alias-control
      :label="
        // prettier-ignore
        translate<string>(formOverrides?.[field]?.label ?? (inputAttributes[field as LoginMechanism]).label)
      "
      :label-hidden="formOverrides?.[field]?.labelHidden"
      :required="formOverrides?.[field]?.required"
      :name="field"
      :placeholder="
        // prettier-ignore
        translate<string>( formOverrides?.[field]?.placeholder  ?? inputAttributes[field as LoginMechanism].label)
      "
      :dialCode="formOverrides?.[field]?.dialCode"
      :dialCodeList="formOverrides?.[field]?.dialCodeList"
    />
  </template>
</template>
