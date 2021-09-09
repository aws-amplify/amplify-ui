<template>
  <select @change="(event) => onChange(event)">
    <option
      v-for="(option, idx) in options"
      :key="idx"
      :value="option"
      :selected="option == selectValue ? true : null"
    >
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
      type: String,
      default: '',
    },
  },
  setup(props, { emit }): { onChange: (event) => void; selectValue: string } {
    const onChange = (e: Event): void => {
      emit('update:selectValue', (<HTMLInputElement>e.target).value);
    };

    const selectValue = props.selectValue;

    return { onChange, selectValue };
  },
});
</script>
