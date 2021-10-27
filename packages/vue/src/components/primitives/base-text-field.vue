<script setup lang="ts">
import { toRefs } from 'vue';
interface textFields {
  label: string;
  id: string;
  autocomplete: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
  name: string;
  type: string;
  initialValue: string;
}
const props = withDefaults(defineProps<textFields>(), {
  label: '',
  id: '',
  autocomplete: '',
  placeholder: '',
  required: true,
  disabled: false,
  name: '',
  type: 'text',
  initialValue: '',
});

const {
  label,
  id,
  autocomplete,
  placeholder,
  required,
  name,
  type,
  initialValue,
} = toRefs(props);
</script>
<template>
  <base-label class="amplify-label sr-only" :for="id">
    {{ label }}
  </base-label>
  <base-wrapper class="amplify-field-group__field-wrapper">
    <base-input
      class="amplify-input amplify-field-group__control"
      :id="id"
      aria-invalid="false"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :required="required"
      :name="name"
      :disabled="disabled"
      :type="type"
      v-model="initialValue"
    ></base-input>
  </base-wrapper>
</template>
