<template>
  <Label>
    <Text>{{ emailAddressLabel }}</Text>
    <Input name="email" required type="email"></Input>
  </Label>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { EMAIL_ADDRESS_LABEL } from "../defaults/DefaultTexts";
import Input from "./primitives/Input.vue";
import Label from "./primitives/Label.vue";
import Text from "./primitives/Text.vue";

export default defineComponent({
  components: {
    Input,
    Label,
    Text
  },
  setup() {
    const emailAddressLabel = computed(() => EMAIL_ADDRESS_LABEL);
    return { emailAddressLabel };
  }
});
</script>

<style scoped></style>
