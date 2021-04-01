<template>
  <div data-amplify-wrapper="">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  provide() {
    return {};
  },
  props: {},
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
