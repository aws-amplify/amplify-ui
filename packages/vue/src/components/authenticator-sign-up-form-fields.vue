<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import {
  translate,
  ValidationError,
  getActorContext,
  SignUpContext,
  UserNameAlias,
  LoginMechanism,
  AuthInputAttributes,
  authInputAttributes,
  SignUpState,
  getActorState,
} from '@aws-amplify/ui';
import { useAuth } from '../composables/useAuth';
import { useAliases } from '../composables/useUtils';
import UserNameAliasComponent from './user-name-alias.vue';
import PasswordControl from './password-control.vue';
import AliasControl from './alias-control.vue';

// state
const { state } = useAuth();

const {
  value: { context },
} = state;

const actorState: ComputedRef<SignUpState> = computed(() =>
  getActorState(state.value)
);

const actorContext = computed(() =>
  getActorContext(state.value)
) as ComputedRef<SignUpContext>;

let [__, ...secondaryAliases] = useAliases(
  context?.config?.login_mechanisms as LoginMechanism[]
);

const inputAttributes: ComputedRef<AuthInputAttributes> = computed(
  () => authInputAttributes
);

// computed properties
const passwordLabel = computed(() => translate('Password'));
const createAccountLabel = computed(() => translate('Create Account'));
const confirmPasswordLabel = computed(() => translate('Confirm Password'));
console.log('got here');
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
      :ariainvalid="
                  !!(actorContext.validationError as ValidationError)['confirm_password']
                "
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
      :ariainvalid="
                  !!(actorContext.validationError as ValidationError)['confirm_password']
                "
    />
  </base-wrapper>
  <p
    data-variation="error"
    class="amplify-text"
    v-if="!!(actorContext.validationError as ValidationError)['confirm_password']"
  >
    {{ (actorContext.validationError as ValidationError)['confirm_password'] }}
  </p>

  <template
    v-for="(alias: UserNameAlias, idx) in secondaryAliases as UserNameAlias[]"
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
</template>
