<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { FormFields, getFormFields } from '@aws-amplify/ui';

import { useAuth } from '../composables/useAuth';
import BaseFormFields from './primitives/base-form-fields.vue';

// state
const { state } = useAuth();

let formFields: FormFields;

onBeforeMount(() => {
  formFields = getFormFields('forceNewPassword', state.value);
});
</script>

<template>
  <base-form-fields :form-fields="formFields"></base-form-fields>
</template>
