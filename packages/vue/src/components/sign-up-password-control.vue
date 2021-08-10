<template>
  <base-label>
    <base-text>{{ passwordLabel }}</base-text>
    <base-input
      autocomplete="new-password"
      name="password"
      required
      type="password"
    ></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";

import BaseInput from "./primitives/base-input.vue";
import BaseText from "./primitives/base-text.vue";
import BaseLabel from "./primitives/base-label.vue";

import { PASSWORD_LABEL } from "../defaults/DefaultTexts";

export default defineComponent({
  components: {
    BaseInput,
    BaseText,
    BaseLabel,
  },
  setup(): { passwordLabel: ComputedRef<string> } {
    const passwordLabel = computed(() => PASSWORD_LABEL);
    return { passwordLabel };
  },
});
</script>

<style scoped></style>
