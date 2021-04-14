<template>
  <base-label>
    <base-text>{{ emailAddressLabel }}</base-text>
    <base-input name="email" required type="email"></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { EMAIL_ADDRESS_LABEL } from "../defaults/DefaultTexts";
import BaseInput from "./primitives/base-input.vue";
import BaseLabel from "./primitives/base-label.vue";
import BaseText from "./primitives/base-text.vue";

export default defineComponent({
  components: {
    BaseInput,
    BaseLabel,
    BaseText
  },
  setup() {
    const emailAddressLabel = computed(() => EMAIL_ADDRESS_LABEL);
    return { emailAddressLabel };
  }
});
</script>

<style scoped></style>
