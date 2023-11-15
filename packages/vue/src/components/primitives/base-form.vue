<template>
  <slot
    v-bind="$attrs"
    name="formt"
    :slotData="mySlots.default && mySlots.default()"
  >
    <form data-amplify-form="" v-bind="$attrs">
      <slot name="default"></slot>
    </form>
  </slot>
</template>

<script setup lang="ts">
import { InternalSlots } from '../../types';
import { useSlots } from 'vue';

const mySlots: Readonly<InternalSlots> = useSlots();
</script>
