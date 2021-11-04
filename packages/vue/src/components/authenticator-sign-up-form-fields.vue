<script setup lang="ts">
import { computed, ComputedRef, toRefs } from 'vue';
import {
  translate,
  LoginMechanism,
  AuthInputAttributes,
  authInputAttributes,
} from '@aws-amplify/ui';
import { useAuth, useAuthenticator } from '../composables/useAuth';
import { useAliases } from '../composables/useUtils';
import UserNameAliasComponent from './user-name-alias.vue';
import PasswordControl from './password-control.vue';
import AliasControl from './alias-control.vue';

// state
const { state } = useAuth();

const {
  value: { context },
} = state;

const { validationErrors } = toRefs(useAuthenticator());

let [__, ...secondaryAliases] = useAliases(
  context?.config?.loginMechanisms as LoginMechanism[]
);

const inputAttributes: ComputedRef<AuthInputAttributes> = computed(
  () => authInputAttributes
);

// computed properties
const passwordLabel = computed(() => translate('Password'));
const confirmPasswordLabel = computed(() => translate('Confirm Password'));
</script>

<template>
  <user-name-alias-component />
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

  <template
    v-for="(alias: LoginMechanism, idx) in secondaryAliases as LoginMechanism[]"
    :key="idx"
  >
    <alias-control
      :label="
        // prettier-ignore
        translate<string>(inputAttributes[alias].label)
      "
      :name="alias"
      :placeholder="
        // prettier-ignore
        translate<string>( inputAttributes[alias].label)
      "
    />
  </template>
</template>
