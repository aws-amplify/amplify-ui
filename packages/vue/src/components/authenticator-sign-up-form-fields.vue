<script setup lang="ts">
import { computed, ComputedRef, toRefs } from 'vue';
import {
  translate,
  LoginMechanism,
  AuthInputAttributes,
  authInputAttributes,
  SignUpAttribute,
  FormField,
  setFormOrder,
  CommonFields,
} from '@aws-amplify/ui';

import { useAuth, useAuthenticator } from '../composables/useAuth';
import UserNameAliasComponent from './user-name-alias.vue';
import PasswordControl from './password-control.vue';
import AliasControl from './alias-control.vue';
import { createSharedComposable } from '@vueuse/core';
import { propsCreator } from '../composables/useUtils';

// state
const { state } = useAuth();

const {
  value: { context },
} = state;

const formOverrides = context?.config?.formFields?.signUp as FormField;

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
const loginMechanism = fieldNames.shift() as LoginMechanism | CommonFields;

const userOverrides = formOverrides?.[loginMechanism];

const common = [
  loginMechanism,
  'password',
  'confirm_password',
] as CommonFields[];

const fieldNamesCombined = [...common, ...fieldNames];
const order = setFormOrder(formOverrides, fieldNamesCombined);
</script>

<template>
  <template v-for="(field, idx) in order" :key="idx">
    <user-name-alias-component
      v-if="field === loginMechanism"
      :label-hidden="userOverrides?.labelHidden"
      :userName="loginMechanism"
      :placeholder="userOverrides?.placeholder"
      :required="userOverrides?.required"
      :label="userOverrides?.label"
      :dialCode="userOverrides?.dialCode"
      :dialCodeList="userOverrides?.dialCodeList"
    />
    <template v-else-if="field === 'password'">
      <password-control
        name="password"
        v-bind="propsCreator('password', passwordLabel, formOverrides, true)"
        autocomplete="new-password"
        :ariainvalid="!!validationErrors.confirm_password"
        @blur="onBlur"
      />
      <div data-amplify-sign-up-errors v-if="!!validationErrors.password">
        <p
          v-for="(error, idx) in validationErrors.password"
          :key="idx"
          role="alert"
          data-variation="error"
          class="amplify-text"
        >
          {{ translate(error) }}
        </p>
      </div>
    </template>

    <template v-else-if="field === 'confirm_password'">
      <password-control
        name="confirm_password"
        v-bind="
          propsCreator(
            'confirm_password',
            confirmPasswordLabel,
            formOverrides,
            true
          )
        "
        autocomplete="new-password"
        :ariainvalid="!!validationErrors.confirm_password"
        @blur="onBlur"
      />
      <p
        role="alert"
        data-variation="error"
        class="amplify-text"
        v-if="!!validationErrors.confirm_password"
      >
        {{ translate(validationErrors.confirm_password) }}
      </p>
    </template>
    <alias-control
      v-else
      :label="
        // prettier-ignore
        translate<string>(formOverrides?.[field]?.label ?? (inputAttributes[field as LoginMechanism]).label)
      "
      :label-hidden="formOverrides?.[field]?.labelHidden"
      :required="formOverrides?.[field]?.required"
      :name="(field as string)"
      :placeholder="
        // prettier-ignore
        translate<string>( formOverrides?.[field]?.placeholder  ?? inputAttributes[field as LoginMechanism].label)
      "
      :dialCode="formOverrides?.[field]?.dialCode"
      :dialCodeList="formOverrides?.[field]?.dialCodeList"
    />
  </template>
</template>
