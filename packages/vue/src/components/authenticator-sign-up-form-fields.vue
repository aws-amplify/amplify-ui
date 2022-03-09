<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { SortedFormFields, getSortedFormFields } from '@aws-amplify/ui';

import { useAuth } from '../composables/useAuth';
import BaseFormFields from './primitives/base-form-fields.vue';

// state
const { state } = useAuth();

let formFields: SortedFormFields = [];

onBeforeMount(() => {
  formFields = getSortedFormFields('signUp', state.value);
});
</script>

<template>
  <base-form-fields :form-fields="formFields"></base-form-fields>
</template>
