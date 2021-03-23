<template>
  <select>
    <option v-for="(option, idx) in options" :key="idx" :value="option.value">
      {{ option.value }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    options: {
      required: true,
      type: Array,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
