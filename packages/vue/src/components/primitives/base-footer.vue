<template>
  <slot
    v-bind="$attrs"
    name="footert"
    :slotData="mySlots.default && mySlots.default()"
  >
    <footer v-bind="$attrs"><slot></slot></footer>
  </slot>
</template>

<script setup lang="ts">
import { InternalSlots } from '../../types';
import { useSlots } from 'vue';

const mySlots: Readonly<InternalSlots> = useSlots();
</script>
