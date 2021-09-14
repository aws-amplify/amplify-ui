<template>
  <base-label
    v-bind="$attrs"
    data-amplify-alias-label
    v-if="name === 'phone_number'"
  >
    <base-label>
      {{ 'Country Code' }}
    </base-label>
    <base-select
      data-amplify-select
      aria-label="country code"
      name="country_code"
      :options="dialCodes"
      :selectValue="defaultDialCode"
    >
    </base-select>
  </base-label>

  <base-label v-bind="$attrs" data-amplify-alias-label>
    <base-text>
      {{ label }}
    </base-text>
    <base-input
      :textValue="uName"
      autocomplete="username"
      :placeholder="label"
      required
      :name="name"
      :disabled="disabled"
      :type="type"
    ></base-input>
  </base-label>
</template>

<script setup lang="ts">
import { ref, computed, ComputedRef } from 'vue';
import {
  authInputAttributes,
  getActorContext,
  getAliasInfoFromContext,
  ActorContextWithForms,
  countryDialCodes,
} from '@aws-amplify/ui';

import { useAuth } from '../composables/useAuth';
import { useAliases } from '../composables/useUtils';

interface PropsInterface {
  userNameAlias?: boolean;
  userName?: string;
  disabled?: boolean;
}

const { userNameAlias, userName, disabled } = withDefaults(
  defineProps<PropsInterface>(),
  {
    userNameAlias: false,
    userName: '',
    disable: false,
  }
);

const { state } = useAuth();
const {
  value: { context },
} = state;

const actorContext: ComputedRef<ActorContextWithForms> = computed(() =>
  getActorContext(state.value)
);

const defaultDialCode = actorContext.value.formValues?.country_code;

let uName = ref('');

if (userName) {
  uName = computed(() => userName);
}

const dialCodes = computed(() => countryDialCodes);

const [primaryAlias] = useAliases(context?.config?.login_mechanisms);

let name = primaryAlias;
let label =
  authInputAttributes[primaryAlias]?.label ??
  authInputAttributes['username'].label;
let type =
  authInputAttributes[name]?.type ?? authInputAttributes['username'].label;

// Only show for Sign In
if (userNameAlias) {
  const aliasInfo = getAliasInfoFromContext(context);
  label = aliasInfo.label || authInputAttributes['username'].label;
  type = aliasInfo.type;
  name = 'username';
}
</script>
