<template>
  <base-label v-if="name === 'phone_number'">
    <base-text>{{ 'Country Code' }}</base-text>
    <base-select
      data-amplify-select
      aria-label="country code"
      name="country_code"
      :options="dialCodes"
      :select-value="defaultDialCode"
    >
    </base-select>
  </base-label>
  <base-label>
    <base-text>{{ label }}</base-text>

    <base-input
      :name="name"
      required
      :type="inputAttributes[name].type"
      :placeholder="placeholder"
    ></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import {
  ActorContextWithForms,
  authInputAttributes,
  countryDialCodes,
  getActorContext,
} from '@aws-amplify/ui';

import BaseInput from './primitives/base-input.vue';
import BaseText from './primitives/base-text.vue';
import BaseLabel from './primitives/base-label.vue';
import BaseSelect from './primitives/base-select.vue';

import { AliasControlTypes } from '../types';
import { useAuth } from '../composables/useAuth';

export default defineComponent({
  components: {
    BaseInput,
    BaseText,
    BaseLabel,
    BaseSelect,
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
    const { state } = useAuth();
    const {
      value: { context },
    } = state;
    //computed
    const inputAttributes = computed(() => authInputAttributes);
    const actorContext: ComputedRef<ActorContextWithForms> = computed(() =>
      getActorContext(state.value)
    );

    const defaultDialCode = actorContext.value.formValues?.country_code;

    const dialCodes = computed(() => countryDialCodes);

    return { inputAttributes, dialCodes, defaultDialCode };
  },
});
</script>
