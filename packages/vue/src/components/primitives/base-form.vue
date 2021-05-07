<template>
  <slot name="formt" :slotData="mySlots.default()">
    <form data-amplify-form="" v-bind="$attrs">
      <slot name="default"></slot>
    </form>
  </slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  inheritAttrs: false,
  setup(_, { slots }): Record<string, unknown> {
    let mySlots = slots;
    return { mySlots };
  }
});
</script>

<style scoped></style>
