<script setup lang="ts">
import { toRefs } from 'vue';
import { createSharedComposable } from '@vueuse/core';

import { FormField, translate } from '@aws-amplify/ui';
import { useAuthenticator } from '../../composables/useAuth';
import PasswordControl from '../password-control.vue';
import AliasControl from '../alias-control.vue';

interface BaseFormField {
  name: string;
  formField: FormField;
}
const props = withDefaults(defineProps<BaseFormField>(), {
  name: '',
  formField: () => ({}),
});

const { name, formField } = toRefs(props);

const useAuthShared = createSharedComposable(useAuthenticator);
const { validationErrors } = toRefs(useAuthShared());

const { type } = formField.value;

const isPasswordField = type === 'password';
</script>
<template>
  <!-- password input -->
  <password-control
    v-if="isPasswordField"
    :name="name"
    :label="formField.label!"
    :placeholder="formField.placeholder!"
    :required="formField.isRequired!"
    :label-hidden="formField.labelHidden!"
    :autocomplete="formField.autocomplete!"
    :ariainvalid="!!validationErrors[name]"
  ></password-control>

  <!-- textfield input -->
  <alias-control
    v-else
    :name="name"
    :label="formField.label"
    :placeholder="formField.placeholder"
    :required="formField.isRequired"
    :label-hidden="formField.labelHidden"
    :autocomplete="formField.autocomplete"
    :dial-code="formField.dialCode"
    :dial-code-list="formField.dialCodeList"
    :type="formField.type"
  ></alias-control>

  <!-- Validation error, if any -->
  <p
    role="alert"
    data-variation="error"
    class="amplify-text"
    v-if="!!validationErrors[name]"
  >
    {{ translate(validationErrors[name]) }}
  </p>
</template>
