<script setup lang="ts">
import { toRefs, onBeforeMount } from 'vue';
import { FormFields, SortedFormFields, sortFormfields } from '@aws-amplify/ui';

import BaseFormField from './base-form-field.vue';

interface BaseFormFields {
  formFields: FormFields;
}
const props = withDefaults(defineProps<BaseFormFields>(), {
  formFields: () => ({}),
});

const { formFields } = toRefs(props);
let sortedFormFields: SortedFormFields;

onBeforeMount(() => {
  sortedFormFields = sortFormfields(formFields.value);
});
</script>
<template>
  <base-form-field
    v-for="[name, formField] in sortedFormFields"
    :name="name"
    :key="name"
    :formField="formField"
  ></base-form-field>
</template>
