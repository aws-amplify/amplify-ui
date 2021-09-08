<template>
  <select @change="(event) => onChange(event)">
    <option v-for="(option, idx) in options" :key="idx" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
const { options } = withDefaults(defineProps<{ options: string[] }>(), {});

const emit = defineEmits(['update:selectValue']);

const onChange = (e: Event): void => {
  emit('update:selectValue', (<HTMLInputElement>e.target).value);
};
</script>
