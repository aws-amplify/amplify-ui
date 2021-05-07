<template>
  <base-label>
    <base-text>
      {{ signInUserNameText }}
    </base-text>
    <base-input
      :name="usernameAlias"
      required
      type="text"
      :disabled="disabled"
      v-model:textValue="name"
    ></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import BaseInput from "./primitives/base-input.vue";
import BaseLabel from "./primitives/base-label.vue";
import BaseText from "./primitives/base-text.vue";
import { useNameAlias } from "../composables/useUtils";
import {
  SignInAndUpNameControlTypes,
  SignUpNameSetupReturnTypes
} from "../types";

export default defineComponent({
  props: {
    userName: {
      default: ""
    },
    disabled: {
      default: false
    },
    usernameAlias: {
      default: "username",
      type: String
    }
  },
  components: {
    BaseInput,
    BaseLabel,
    BaseText
  },
  setup(props: SignInAndUpNameControlTypes): SignUpNameSetupReturnTypes {
    // computed
    const signInUserNameText = computed(() =>
      useNameAlias(props.usernameAlias)
    );
    let name = ref("");
    if (props.userName) {
      name = computed(() => props.userName);
    }
    return { name, signInUserNameText };
  }
});
</script>

<style scoped></style>
