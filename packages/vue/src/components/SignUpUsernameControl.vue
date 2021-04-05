<template>
  <Label>
    <Text>{{ fullNameText }}</Text>
    <Input name="username" required type="text"></Input>
  </Label>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Input from "./primitives/Input.vue";
import Label from "./primitives/Label.vue";
import Text from "./primitives/Text.vue";
import { FULL_NAME_TEXT } from "../defaults/DefaultTexts";

export default defineComponent({
  components: {
    Input,
    Label,
    Text
  },
  setup() {
    const fullNameText = computed(() => FULL_NAME_TEXT);
    return { fullNameText };
  }
});
</script>

<style scoped></style>
