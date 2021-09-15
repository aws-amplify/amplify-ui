<template>
  <base-label v-bind="$attrs" v-if="name === 'phone_number'">
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
  <base-label v-bind="$attrs">
    <base-text>{{ label }}</base-text>

    <base-input
      :name="name"
      required
      :type="inputAttributes[name].type"
      :placeholder="placeholder"
    ></base-input>
  </base-label>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import {
  ActorContextWithForms,
  authInputAttributes,
  countryDialCodes,
  getActorContext,
} from '@aws-amplify/ui';

import { useAuth } from '../composables/useAuth';

interface PropsInterface {
  label: string;
  name: string;
  placeholder?: string;
}

const { label, name, placeholder } = withDefaults(
  defineProps<PropsInterface>(),
  {
    label: 'Username',
    name: 'username',
    placeholder: '',
  }
);

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
</script>
