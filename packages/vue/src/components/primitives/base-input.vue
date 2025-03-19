<template>
  <input 
    @change="(event) => onInput(event)" 
    data-amplify-input="" 
    :role="determineRole()" 
    :type="type"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ 
  type?: string
}>(), {
  type: 'text'
});

const { type } = props;

const emit = defineEmits(['update:modelValue']);

const onInput = (e: Event): void => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};

// Using a function instead of a computed binding to ensure
// the role is determined at render time and more likely to be
// included in the DOM for e2e tests
function determineRole() {
  if (type === 'radio') return 'radio';
  if (type === 'checkbox') return 'checkbox';
  return 'textbox';
}
</script>
