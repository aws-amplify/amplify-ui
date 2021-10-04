<script setup lang="ts">
const { active, id, label } = withDefaults(
  defineProps<{
    label: string;
    id: number;
    active?: boolean;
  }>(),
  {
    active: false,
  }
);
</script>

<template>
  <base-wrapper
    :tabindex="active ? 0 : -1"
    :data-state="active ? 'active' : 'inactive'"
    :aria-selected="active ? 'true' : 'false'"
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
