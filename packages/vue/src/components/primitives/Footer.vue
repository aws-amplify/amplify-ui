<template>
  <slot name="footert" :slotData="mySlots.default()">
    <footer data-spark-footer=""><slot></slot></footer>
  </slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(_, { slots }) {
    let mySlots = slots;
    return { mySlots };
  },
});
</script>

<style scoped></style>
