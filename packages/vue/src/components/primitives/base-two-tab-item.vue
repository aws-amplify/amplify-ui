<script setup lang="ts">
import { ref, watch } from 'vue';
import useSelect from '../../composables/useSelect';

const { label, firstTab, id } = withDefaults(
  defineProps<{
    label: string;
    id: number;
    firstTab?: boolean;
  }>(),
  {
    firstTab: false,
  }
);

const { active } = useSelect;

const myActive = ref(firstTab);

/**
 * Toggle active tab from useSelect composable
 **/

watch(
  () => active.value,
  () => {
    myActive.value = !myActive.value;
  }
);

function toggleTabs() {
  active.value = !active.value;
}
</script>

<template>
  <base-wrapper
    @click="toggleTabs()"
    :tabindex="!myActive ? 0 : -1"
    :data-state="!myActive ? 'active' : 'inactive'"
    :aria-selected="!active ? 'true' : 'false'"
    :aria-controls="`radix-id-${id}-8-content-0`"
    :id="`radix-id-${id}-8-trigger-0`"
    data-orientation="horizontal"
    role="tab"
    class="amplify-tabs-item"
    data-grow="equal"
    data-radix-collection-item=""
  >
    {{ label }}
  </base-wrapper>
</template>
