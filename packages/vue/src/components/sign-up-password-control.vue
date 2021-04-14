<template>
  <base-label>
    <base-text>{{ passwordLabel }}</base-text>
    <base-input name="password" required type="password"></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { PASSWORD_LABEL } from "../defaults/DefaultTexts";

import BaseInput from "./primitives/base-input.vue";
import BaseText from "./primitives/base-text.vue";
import BaseLabel from "./primitives/base-label.vue";

export default defineComponent({
  components: {
    BaseInput,
    BaseText,
    BaseLabel
  },
  setup() {
    const passwordLabel = computed(() => PASSWORD_LABEL);
    return { passwordLabel };
  }
});
</script>

<style scoped></style>
