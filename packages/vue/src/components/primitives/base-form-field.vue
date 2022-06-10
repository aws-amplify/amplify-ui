<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { nanoid } from 'nanoid';

import { FormFieldOptions, getErrors, translate } from '@aws-amplify/ui';
import { useAuthenticator } from '../../composables/useAuth';
import PasswordControl from '../password-control.vue';
import AliasControl from '../alias-control.vue';

interface BaseFormField {
  name: string;
  formField: FormFieldOptions;
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

const errorId = nanoid(12);

const errors = computed(() => getErrors(validationErrors.value[name.value]));
const hasError = computed(() => errors.value?.length > 0);
const ariaDescribedBy = computed(() => (hasError.value ? errorId : undefined));
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
    :hasError="hasError"
    :describedBy="ariaDescribedBy"
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
    :hasError="hasError"
    :describedBy="ariaDescribedBy"
  ></alias-control>

  <!-- Validation error, if any -->
  <div v-if="hasError" :id="ariaDescribedBy">
    <p
      v-for="(error, idx) in errors"
      :key="idx"
      role="alert"
      data-variation="error"
      class="amplify-text amplify-text--error"
    >
      {{ translate(error) }}
    </p>
  </div>
</template>
