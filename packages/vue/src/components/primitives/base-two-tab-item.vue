<script setup lang="ts">
import { toRefs } from 'vue';
const props = withDefaults(
  defineProps<{
    label: string;
    id: string;
    active?: boolean;
  }>(),
  {
    active: false,
  }
);

const { active, id, label } = toRefs(props);
</script>

<template>
  <button
    :tabindex="active ? 0 : -1"
    :aria-selected="active ? 'true' : 'false'"
    :class="{ 'amplify-tabs__item--active': active }"
    :id="`${id}-tab`"
    :aria-controls="`${id}-panel`"
    role="tab"
    class="amplify-tabs__item"
  >
    {{ label }}
  </button>
</template>
