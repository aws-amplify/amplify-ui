<template>
  <slot name="formt" :slotData="mySlots.default()">
    <form data-spark-form="" v-bind="$attrs">
      <slot name="default"></slot>
    </form>
  </slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  inheritAttrs: false,
  setup(_, { slots }) {
    let mySlots = slots;
    return { mySlots };
  }
});
</script>

<style scoped></style>
