<template>
  <base-label>
    <base-text>{{ emailAddressLabel }}</base-text>
    <base-input name="email" required type="email"></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";

import BaseInput from "./primitives/base-input.vue";
import BaseLabel from "./primitives/base-label.vue";
import BaseText from "./primitives/base-text.vue";

import { EMAIL_ADDRESS_LABEL } from "../defaults/DefaultTexts";

export default defineComponent({
  components: {
    BaseInput,
    BaseLabel,
    BaseText,
  },
  setup(): { emailAddressLabel: ComputedRef<string> } {
    const emailAddressLabel = computed(() => EMAIL_ADDRESS_LABEL);
    return { emailAddressLabel };
  },
});
</script>

<style scoped></style>
