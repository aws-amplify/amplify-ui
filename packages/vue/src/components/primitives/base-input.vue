<template>
  <input
    :value="textValue"
    @input="(event) => onInput(event)"
    data-amplify-input=""
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    textValue: {
      default: '',
    },
  },
  setup(_, { emit }): { onInput: (event) => void } {
    const onInput = (e: Event): void => {
      emit('update:textValue', (<HTMLInputElement>e.target).value);
    };

    return { onInput };
  },
});
</script>
