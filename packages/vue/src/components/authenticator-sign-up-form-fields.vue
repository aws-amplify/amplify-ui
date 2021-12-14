<script setup lang="ts">
import { computed, ComputedRef, toRefs } from 'vue';
import {
  AuthFormData,
  getActorContext,
  translate,
  LoginMechanism,
  AuthInputAttributes,
  authInputAttributes,
  SignUpAttribute,
  SignInContext,
} from '@aws-amplify/ui';
import { useAuth, useAuthenticator } from '../composables/useAuth';
import PasswordControl from './password-control.vue';
import AliasControl from './alias-control.vue';

// state
const { state, validationErrors } = toRefs(useAuthenticator());
const props = useAuthenticator();

const {
  value: { context },
} = state;

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
const actorContext = computed(() => {
  return getActorContext(state.value);
}) as ComputedRef<SignInContext>;
const formValues = computed(
  () => actorContext.value?.formValues as AuthFormData
);
actorContext.value.formValues;
const loginMechanismValue = computed(() => {
  return loginMechanism === 'phone_number'
    ? `${formValues.value.country_code ?? ''}${formValues.value.phone ?? ''}`
    : formValues.value.email;
});
</script>

<template>
  <alias-control
    :label="
      // prettier-ignore
      translate<string>((inputAttributes[loginMechanism]).label)
    "
    :name="loginMechanism"
    :placeholder="
      // prettier-ignore
      translate<string>( inputAttributes[loginMechanism].label)
    "
  />

  <input
    v-if="['email', 'phone_number'].includes(loginMechanism)"
    name="username"
    readOnly
    type="hidden"
    :value="loginMechanismValue"
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
    {{ translate(validationErrors.confirm_password) }}
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
