<script setup lang="ts">
interface PropsInterface {
  type?: 'submit' | 'button';
  fullWidth?: boolean | string;
  size?: 'small' | 'medium' | 'large';
  variation?: 'primary' | 'default' | 'link';
  fontWeight?: 'normal' | 'bold' | 'lighter';
}
const { type, fullWidth, size, variation, fontWeight } = withDefaults(
  defineProps<PropsInterface>(),
  {}
);
</script>
<template>
  <slot v-bind="$attrs" name="buttont">
    <button
      :type="type"
      :style="{ fontWeight: fontWeight }"
      :data-fullwidth="fullWidth"
      :data-size="size"
      :data-fontWeight="fontWeight"
      :data-variation="variation"
      v-bind="$attrs"
      data-amplify-button=""
    >
      <slot></slot>
    </button>
  </slot>
</template>
