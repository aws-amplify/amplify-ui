<template>
  <base-label>
    <base-text>{{ fullNameText }}</base-text>
    <base-input
      name="username"
      required
      type="text"
      :disabled="disabled"
      v-model:textValue="name"
    ></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, ref, Ref } from "vue";
import BaseInput from "./primitives/base-input.vue";
import BaseLabel from "./primitives/base-label.vue";
import BaseText from "./primitives/base-text.vue";
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
    BaseInput,
    BaseLabel,
    BaseText
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
