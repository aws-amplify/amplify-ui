<template>
  <slot name="fieldSetI" :slotData="mySlots.default()">
    <fieldset data-amplify-fieldset="" v-bind="$attrs">
      <slot></slot>
    </fieldset>
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
