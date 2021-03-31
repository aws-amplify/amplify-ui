<template>
  <input
    :value="textValue"
    @input="event => $emit('update:textValue', event.target.value)"
    data-spark-input=""
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    textValue: {
      default: ""
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
