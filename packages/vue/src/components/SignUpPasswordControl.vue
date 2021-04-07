<template>
  <Label>
    <Text>{{ passwordLabel }}</Text>
    <Input name="password" required type="password"></Input>
  </Label>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { PASSWORD_LABEL } from "../defaults/DefaultTexts";

import Input from "./primitives/Input.vue";
import Text from "./primitives/Text.vue";
import Label from "./primitives/Label.vue";

export default defineComponent({
  components: {
    Input,
    Text,
    Label
  },
  setup() {
    const passwordLabel = computed(() => PASSWORD_LABEL);
    return { passwordLabel };
  }
});
</script>

<style scoped></style>
