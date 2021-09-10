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
      v-model:textValue="uName"
      :placeholder="label"
      :autocomplete="name"
      required
      :name="name"
      :disabled="disabled"
      :type="type"
    ></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef } from 'vue';
import {
  authInputAttributes,
  getActorContext,
  getAliasInfoFromContext,
  ActorContextWithForms,
  countryDialCodes,
} from '@aws-amplify/ui';

import BaseInput from './primitives/base-input.vue';
import BaseLabel from './primitives/base-label.vue';
import BaseText from './primitives/base-text.vue';
import BaseSelect from './primitives/base-select.vue';

import { useAuth } from '../composables/useAuth';
import { useAliases } from '../composables/useUtils';

import { UserNameAliasTypes, UserNameAliasSetupReturnTypes } from '../types';

export default defineComponent({
  components: {
    BaseInput,
    BaseLabel,
    BaseText,
    BaseSelect,
  },
  props: {
    userNameAlias: {
      default: false,
    },
    userName: {
      default: '',
    },
    disabled: {
      default: false,
    },
  },
  inheritAttrs: false,
  setup(props: UserNameAliasTypes): UserNameAliasSetupReturnTypes {
    const { state } = useAuth();
    const {
      value: { context },
    } = state;

    const actorContext: ComputedRef<ActorContextWithForms> = computed(() =>
      getActorContext(state.value)
    );

    const defaultDialCode = actorContext.value.formValues?.country_code;

    let uName = ref('');

    if (props.userName) {
      uName = computed(() => props.userName);
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
    if (props.userNameAlias) {
      const aliasInfo = getAliasInfoFromContext(context);
      label = aliasInfo.label || authInputAttributes['username'].label;
      type = aliasInfo.type;
      name = 'username';
    }

    return { label, name, type, uName, dialCodes, defaultDialCode };
  },
});
</script>
