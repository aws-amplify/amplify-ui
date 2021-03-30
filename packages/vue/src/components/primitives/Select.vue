<template>
  <select @change="event => $emit('update:selectValue', event.target.value)">
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
      type: Array
    },
    selectValue: {
      default: ""
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
