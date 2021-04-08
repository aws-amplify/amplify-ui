/* eslint-disable */
<template>
  <div :data-amplify-theme="defaults ? '' : null">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    defaults: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return {};
  }
});
</script>

<style scoped></style>
