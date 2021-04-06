<template>
  <Label>
    <Text>{{ fullNameText }}</Text>
    <Input
      name="username"
      required
      type="text"
      :disabled="disabled"
      v-model:textValue="name"
    ></Input>
  </Label>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, ref, Ref } from "vue";
import Input from "./primitives/Input.vue";
import Label from "./primitives/Label.vue";
import Text from "./primitives/Text.vue";
import { FULL_NAME_TEXT } from "../defaults/DefaultTexts";

export default defineComponent({
  props: {
    userName: {
      default: ""
    },
    disabled: {
      default: false
    }
  },
  components: {
    Input,
    Label,
    Text
  },
  setup(props: {
    userName: string;
    disabled: boolean;
  }): {
    fullNameText: ComputedRef<string>;
    name: ComputedRef<string> | Ref<string>;
  } {
    const fullNameText = computed(() => FULL_NAME_TEXT);
    let name = ref("");
    if (props.userName) {
      name = computed(() => props.userName);
    }
    return { fullNameText, name };
  }
});
</script>

<style scoped></style>
