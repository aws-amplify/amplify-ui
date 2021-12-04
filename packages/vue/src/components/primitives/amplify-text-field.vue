<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
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
  labelHidden?: boolean;
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
  labelHidden: false,
});

const { label, id, autocomplete, placeholder, required, name, type } =
  toRefs(props);
</script>
<template>
  <base-label v-if="labelHidden" class="amplify-label sr-only" :for="id">
    {{ label }}
  </base-label>
  <base-wrapper class="amplify-field-group__field-wrapper">
    <base-input
      v-bind="$attrs"
      class="amplify-input amplify-field-group__control"
      :id="id"
      aria-invalid="false"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :required="required"
      :name="name"
      :disabled="disabled"
      :type="type"
    ></base-input>
  </base-wrapper>
</template>
