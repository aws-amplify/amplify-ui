<script setup lang="ts">
import { toRefs, onBeforeMount } from 'vue';
import {
  FormFieldComponents,
  FormFieldsArray,
  getSortedFormFields,
} from '@aws-amplify/ui';

import { useAuth } from '../../composables/useAuth';
import BaseFormField from './base-form-field.vue';

interface BaseFormFields {
  route: FormFieldComponents;
}
const props = defineProps<BaseFormFields>();

const { route } = toRefs(props);

const { state } = useAuth();
let formFields: FormFieldsArray = [];

onBeforeMount(() => {
  formFields = getSortedFormFields(route.value, state.value);
});
</script>
<template>
  <base-form-field
    v-for="[name, formField] in formFields"
    :name="name"
    :key="name"
    :formField="formField"
  ></base-form-field>
</template>
