<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { FormFieldsArray, getSortedFormFields } from '@aws-amplify/ui';

import { useAuth } from '../composables/useAuth';
import BaseFormFields from './primitives/base-form-fields.vue';

// state
const { state } = useAuth();

let sortedFormFields: FormFieldsArray = [];

onBeforeMount(() => {
  sortedFormFields = getSortedFormFields('forceNewPassword', state.value);
});
</script>

<template>
  <base-form-fields :form-fields="sortedFormFields"></base-form-fields>
</template>
