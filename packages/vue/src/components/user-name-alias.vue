<template>
  <base-label>
    <base-text>
      {{ label }}
    </base-text>
    <base-input
      v-model:textValue="uName"
      :autocomplete="name"
      required
      :name="name"
      :disabled="disabled"
      :type="type"
    ></base-input>
    <base-text> {{ error }}</base-text>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import {
  authInputAttributes,
  getActorContext,
  getAliasInfoFromContext,
} from '@aws-amplify/ui-core';

import BaseInput from './primitives/base-input.vue';
import BaseLabel from './primitives/base-label.vue';
import BaseText from './primitives/base-text.vue';

import { useAuth } from '../composables/useAuth';
import { useAliases } from '../composables/useUtils';

import { UserNameAliasTypes, UserNameAliasSetupReturnTypes } from '../types';

export default defineComponent({
  components: {
    BaseInput,
    BaseLabel,
    BaseText,
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
  setup(props: UserNameAliasTypes): UserNameAliasSetupReturnTypes {
    const { state } = useAuth();
    const {
      value: { context },
    } = state;
    const actorContext = getActorContext(state.value);

    let uName = ref('');

    if (props.userName) {
      uName = computed(() => props.userName);
    }

    const error = actorContext.validationError['username'];

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

    return { label, name, type, error, uName };
  },
});
</script>
