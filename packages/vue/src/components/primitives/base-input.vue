<template>
  <input @change="(event) => onInput(event)" data-amplify-input="" />
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);

const onInput = (e: Event): void => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
</script>