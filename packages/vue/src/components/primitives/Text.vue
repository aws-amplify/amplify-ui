<template>
  <slot v-bind="$attrs" name="textI">
    <span data-spark-text="" v-bind="$attrs">
      <slot></slot>
    </span>
  </slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
