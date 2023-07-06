<template>
  <select @change="(event) => onChange(event)">
    <option
      v-for="(option, idx) in options"
      :key="idx"
      :value="option"
      :selected="option == selectValue ? true : undefined"
    >
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
const props = withDefaults(
  defineProps<{ selectValue: string; options: string[] | undefined }>(),
  {
    selectValue: '',
  }
);

const { options, selectValue } = toRefs(props);

const emit = defineEmits(['update:selectValue']);

const onChange = (e: Event): void => {
  emit('update:selectValue', (e.target as HTMLInputElement).value);
};
</script>
