<template>
  <template v-if="name === 'phone_number'">
    <base-label for="amplify-field-1177">
      {{ 'Country Code' }}
    </base-label>
    <base-select
      data-amplify-select
      id="amplify-field-1177"
      aria-label="country code"
      name="country_code"
      :options="dialCodes"
      :selectValue="defaultDialCode"
    >
    </base-select>
  </template>

  <base-label v-bind="$attrs">
    {{ label }}
  </base-label>
  <base-wrapper class="amplify-flex">
    <base-input
      class="amplify-input amplify-field-group__control"
      id="amplify-field-1220"
      aria-invalid="false"
      :textValue="uName"
      autocomplete="username"
      :placeholder="label"
      required
      :name="name"
      :disabled="disabled"
      :type="type"
    ></base-input>
  </base-wrapper>
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
import { I18n } from 'aws-amplify';

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
label = I18n.get(label);
</script>
