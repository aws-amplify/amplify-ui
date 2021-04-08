<template>
  <h1 class="text-3xl mb-5">{{ title }}</h1>
  <slot name="sub"> </slot>

  <aside
    class="p-6 mb-10 shadow-inner bg-gray-100 rounded w-full flex flex-col"
  >
    <div class="w-full text-xl mb-10 ">
      <prism-wrapper language="html" :code="code"> </prism-wrapper>
    </div>
    <slot></slot>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrismWrapper from "./prism-wrapper.vue";

export default defineComponent({
  props: {
    title: {
      default: ""
    },
    code: {
      default: ""
    }
  },
  components: {
    PrismWrapper
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
