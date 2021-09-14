<template>
  <input
    :value="textValue"
    @input="(event) => onInput(event)"
    data-amplify-input=""
  />
</template>

<script setup lang="ts">
const { textValue } = withDefaults(defineProps<{ textValue?: string }>(), {
  textValue: '',
});

const emit = defineEmits(['update:textValue']);

const onInput = (e: Event): void => {
  emit('update:textValue', (<HTMLInputElement>e.target).value);
};
</script>
