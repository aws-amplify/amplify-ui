<script setup lang="ts">
import {
  getActorState,
  SignInState,
  translate,
  LoginMechanism,
  AuthInputAttributes,
  authInputAttributes,
} from '@aws-amplify/ui';
import { computed, ComputedRef } from 'vue';
import { useAuth } from '../composables/useAuth';
import AliasControl from './alias-control.vue';

const { state } = useAuth();
const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<SignInState>;

const inputAttributes: ComputedRef<AuthInputAttributes> = computed(
  () => authInputAttributes
);

const {
  value: { context },
} = state;

const formOverrides = context?.config?.formFields?.forceNewPassword;

let requiredAttributes = actorState.value.context.requiredAttributes;

requiredAttributes = requiredAttributes?.filter((fieldName) => {
  const hasDefaultField = !!authInputAttributes[fieldName as LoginMechanism];
  if (!hasDefaultField) {
    console.debug(
      `Authenticator does not have a default implementation for ${fieldName}. Customize the authenticator force-new-password-fields slot to add your own.`
    );
  }
  return hasDefaultField;
});
</script>

<template>
  <template v-for="(field, idx) in requiredAttributes" :key="idx">
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
    />
  </template>
</template>
