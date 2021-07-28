<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  provide() {
    return {};
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
