<template>
  <div data-spark-wrapper="">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  provide() {
    return {
      category: ref(this.category),
      defaultClasses: ref(this.defaultWrapper),
    };
  },
  props: {
    category: {
      type: String,
    },
    defaultWrapper: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
