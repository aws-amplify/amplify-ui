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

// Determine the appropriate role based on input type
const determineRole = () => {
  switch (type) {
    case 'radio':
      return 'radio';
    case 'checkbox':
      return 'checkbox';
    default:
      return 'textbox';
  }
};
</script>
