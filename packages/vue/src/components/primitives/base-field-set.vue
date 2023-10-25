<template>
  <slot
    v-bind="$attrs"
    name="fieldSetI"
    :slotData="mySlots.default && mySlots.default()"
  >
    <fieldset v-bind="$attrs" data-amplify-fieldset="">
      <slot></slot>
    </fieldset>
  </slot>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import { InternalSlots } from '../../types';

const mySlots: Readonly<InternalSlots> = useSlots();
</script>
