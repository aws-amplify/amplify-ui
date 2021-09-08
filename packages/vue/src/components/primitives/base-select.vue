<template>
  <select @change="(event) => onChange(event)">
    <option v-for="(option, idx) in options" :key="idx" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    options: {
      required: true,
      type: Array as PropType<string[]>,
    },
    selectValue: {
      default: '',
    },
  },
  setup(_, { emit }): { onChange: (event) => void } {
    const onChange = (e: Event): void => {
      emit('update:selectValue', (<HTMLInputElement>e.target).value);
    };

    return { onChange };
  },
});
</script>
