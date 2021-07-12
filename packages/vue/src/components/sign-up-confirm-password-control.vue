<template>
  <base-label>
    <base-text>{{ confirmPasswordLabel }}</base-text>
    <base-input name="confirm_password" required type="password"></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";
import { CONFIRM_PASSWORD_LABEL } from "../defaults/DefaultTexts";

import BaseInput from "./primitives/base-input.vue";
import BaseText from "./primitives/base-text.vue";
import BaseLabel from "./primitives/base-label.vue";

export default defineComponent({
  components: {
    BaseInput,
    BaseText,
    BaseLabel,
  },
  setup(): { confirmPasswordLabel: ComputedRef<string> } {
    const confirmPasswordLabel = computed(() => CONFIRM_PASSWORD_LABEL);
    return { confirmPasswordLabel };
  },
});
</script>
