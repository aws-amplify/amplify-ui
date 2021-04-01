<template>
  <h1 class="text-3xl mb-5">{{ title }}</h1>
  <slot name="sub"> </slot>

  <aside
    class="p-6 mb-10 shadow-inner bg-gray-100 rounded w-full flex flex-col"
  >
    <div class="w-full text-xl mb-10 ">
      <Prism language="html" :code="code"> </Prism>
    </div>
    <slot></slot>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Prism from './Prism.vue';

export default defineComponent({
  props: {
    title: {
      default: ''
    },
    code: {
      default: ''
    }
  },
  components: {
    Prism
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
