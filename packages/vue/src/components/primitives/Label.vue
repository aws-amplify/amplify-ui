<template>
  <label data-spark-label="">
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Label",
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
