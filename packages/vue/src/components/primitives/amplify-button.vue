<script setup lang="ts">
import { toRefs } from 'vue';
interface PropsInterface {
  type?: 'submit' | 'button';
  fullWidth?: boolean | string;
  size?: 'small' | 'medium' | 'large';
  variation?: 'primary' | 'default' | 'link';
  fontWeight?: 'normal' | 'bold' | 'lighter';
  loading?: boolean | string;
  disabled?: boolean | 'true' | 'false';
}
const props = withDefaults(defineProps<PropsInterface>(), {});

const { type, fullWidth, size, variation, fontWeight } = toRefs(props);
</script>
<template>
  <slot v-bind="$attrs" name="buttont">
    <button
      class="amplify-button amplify-field-group__control"
      :class="{
        [`amplify-button--${variation}`]: variation,
        [`amplify-button--${size}`]: size,
        'amplify-button--fullwidth': fullWidth,
        'amplify-button--loading': loading,
        'amplify-button--disabled': disabled,
      }"
      :type="type"
      :style="{ fontWeight: fontWeight }"
      :data-fullwidth="fullWidth"
      :data-size="size"
      :data-fontWeight="fontWeight"
      :data-variation="variation"
      :data-loading="loading"
      :data-disabled="disabled"
      :disabled="disabled"
      v-bind="$attrs"
      data-amplify-button=""
    >
      <slot></slot>
    </button>
  </slot>
</template>
