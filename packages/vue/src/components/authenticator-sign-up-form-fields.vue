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

// state
const { state } = useAuth();

const {
  value: { context },
} = state;

const { validationErrors } = toRefs(useAuthenticator());
const props = useAuthenticator();

const inputAttributes: ComputedRef<AuthInputAttributes> = computed(
  () => authInputAttributes
);

// computed properties
const passwordLabel = computed(() => translate('Password'));
const confirmPasswordLabel = computed(() => translate('Confirm Password'));

//
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
  <user-name-alias-component :userName="loginMechanism" />
  <base-wrapper
    class="
      amplify-flex amplify-field amplify-textfield amplify-passwordfield
      password-field
    "
    style="flex-direction: column"
  >
    <password-control
      name="password"
      :label="passwordLabel"
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
      :label="confirmPasswordLabel"
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
    {{ validationErrors.confirm_password }}
  </p>

  <template v-for="(field, idx) in fieldNames" :key="idx">
    <alias-control
      :label="
        // prettier-ignore
        translate<string>((inputAttributes[field as LoginMechanism]).label)
      "
      :name="field"
      :placeholder="
        // prettier-ignore
        translate<string>( inputAttributes[field as LoginMechanism].label)
      "
    />
  </template>
</template>
