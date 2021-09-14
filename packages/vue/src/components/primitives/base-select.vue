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

<script setup lang="ts">
const { options, selectValue } = withDefaults(
  defineProps<{ selectValue: string; options: string[] }>(),
  {
    selectValue: '',
  }
);

const emit = defineEmits(['update:selectValue']);

const onChange = (e: Event): void => {
  emit('update:selectValue', (<HTMLInputElement>e.target).value);
};
</script>
