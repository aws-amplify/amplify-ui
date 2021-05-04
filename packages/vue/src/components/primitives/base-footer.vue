<template>
  <slot name="footert" :slotData="mySlots.default()">
    <footer data-amplify-footer=""><slot></slot></footer>
  </slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(_, { slots }): Record<string, unknown> {
    let mySlots = slots;
    return { mySlots };
  }
});
</script>

<style scoped></style>
