<template>
  <div>
    <base-text>{{ passwordLabel }}</base-text>
    <base-input
      name="password"
      autocomplete="current-password"
      required
      type="password"
    />
  </div>
</template>

<script lang="ts">
import BaseText from "./primitives/base-text.vue";
import BaseInput from "./primitives/base-input.vue";

import { PASSWORD_LABEL } from "../defaults/DefaultTexts";
export default {
  components: {
    BaseText,
    BaseInput,
  },
  computed: {
    passwordLabel: (): string => PASSWORD_LABEL,
  },
  setup(): void {
    return;
  },
};
</script>

<style scoped></style>
