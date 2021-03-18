<template>
  <slot v-bind="$attrs" name="buttont">
    <button v-bind="$attrs" data-spark-button="">
      <slot></slot>
    </button>
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
