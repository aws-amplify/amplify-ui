<template>
  <slot v-bind="$attrs" name="footert" :slotData="mySlots.default()">
    <footer v-bind="$attrs" data-amplify-footer=""><slot></slot></footer>
  </slot>
</template>

<script setup lang="ts">
import { InternalSlots } from '../../types';
import { useSlots } from 'vue';

let mySlots: Readonly<InternalSlots> = useSlots();
</script>
