<template>
  <slot name="footert" :slotData="mySlots.default()">
    <footer data-amplify-footer=""><slot></slot></footer>
  </slot>
</template>

<script lang="ts">
import { PrimitiveSlotReturnType } from '../../types';
import { defineComponent } from 'vue';

export default defineComponent({
  setup(_, { slots }): PrimitiveSlotReturnType {
    let mySlots = slots;
    return { mySlots };
  },
});
</script>

<style scoped></style>
