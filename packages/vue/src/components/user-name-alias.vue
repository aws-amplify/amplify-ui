<template>
  <base-label>
    <base-text>
      {{ label }}
    </base-text>
    <base-input
      v-model:textValue="uName"
      :autocomplete="name"
      required
      :name="name"
      :disabled="disabled"
      :type="type"
    ></base-input>
    <base-text> {{ error }}</base-text>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import BaseInput from "./primitives/base-input.vue";
import BaseLabel from "./primitives/base-label.vue";
import BaseText from "./primitives/base-text.vue";

import { useAuth } from "../composables/useAuth";
import { useAliases } from "../composables/useUtils";

import { UserNameAliasNames } from "../defaults/DefaultTexts";
import { UserNameAliasTypes, UserNameAliasSetupReturnTypes } from "../types";

export default defineComponent({
  components: {
    BaseInput,
    BaseLabel,
    BaseText,
  },
  props: {
    userNameAlias: {
      default: false,
    },
    userName: {
      default: "",
    },
    disabled: {
      default: false,
    },
  },
  setup(props: UserNameAliasTypes): UserNameAliasSetupReturnTypes {
    const { state } = useAuth();
    const {
      value: { context },
    } = state;

    let uName = ref("");

    if (props.userName) {
      uName = computed(() => props.userName);
    }

    const error = context.validationError["username"];
    const loginMechanisms = context.config?.login_mechanisms ?? ["username"];

    const [primaryAlias] = useAliases(context?.config?.login_mechanisms);

    let name = primaryAlias;
    let label = UserNameAliasNames[primaryAlias].name;
    let type = UserNameAliasNames[name].type;

    // Only show for Sign In
    if (props.userNameAlias) {
      label = loginMechanisms
        .map(
          v =>
            UserNameAliasNames[v]?.name ?? UserNameAliasNames["username"].name
        )
        .join(" or ");

      if (loginMechanisms.length === 1) {
        type = UserNameAliasNames[loginMechanisms[0]]?.type ?? "text";
      } else {
        type = "text";
      }
      name = "username";
    }

    return { label, name, type, error, uName };
  },
});
</script>
