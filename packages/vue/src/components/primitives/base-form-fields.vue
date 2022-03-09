<script setup lang="ts">
import { toRefs } from 'vue';
import { FormFieldsArray } from '@aws-amplify/ui';

import BaseFormField from './base-form-field.vue';

interface BaseFormFields {
  formFields: FormFieldsArray;
}
const props = withDefaults(defineProps<BaseFormFields>(), {
  formFields: () => [],
});

const { formFields } = toRefs(props);
</script>
<template>
  <base-form-field
    v-for="[name, formField] in formFields"
    :name="name"
    :key="name"
    :formField="formField"
  ></base-form-field>
</template>
