<template>
  <slot name="formt" :slotData="mySlots.default()">
    <form data-amplify-form="" v-bind="$attrs">
      <slot name="default"></slot>
    </form>
  </slot>
</template>

<script lang="ts">
import { PrimitiveSlotReturnType } from '../../types';
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  setup(_, { slots }): PrimitiveSlotReturnType {
    let mySlots = slots;
    return { mySlots };
  },
});
</script>

<style scoped></style>
