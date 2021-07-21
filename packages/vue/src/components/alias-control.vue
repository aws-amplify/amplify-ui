<template>
  <base-label>
    <base-text>{{ label }}</base-text>
    <base-input
      :name="name"
      required
      :type="userNameAliasNames[name].type"
      :placeholder="placeholder"
    ></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { UserNameAliasNames } from '@aws-amplify/ui-core';

import BaseInput from './primitives/base-input.vue';
import BaseText from './primitives/base-text.vue';
import BaseLabel from './primitives/base-label.vue';

import { AliasControlTypes } from '../types';

export default defineComponent({
  components: {
    BaseInput,
    BaseText,
    BaseLabel,
  },
  props: {
    label: {
      default: 'Username',
      required: true,
      type: String,
    },
    name: {
      default: 'username',
      required: true,
      type: String,
    },
    placeholder: {
      default: (props) => props.label,
      type: String,
    },
  },
  setup(): AliasControlTypes {
    //computed
    const userNameAliasNames = computed(() => UserNameAliasNames);

    return { userNameAliasNames };
  },
});
</script>
