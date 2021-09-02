<template>
  <base-label>
    <base-text>{{ confirmPasswordLabel }}</base-text>
    <base-input
      autocomplete="new-password"
      name="confirm_password"
      required
      type="password"
    ></base-input>
  </base-label>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import { I18n } from 'aws-amplify';

import BaseInput from './primitives/base-input.vue';
import BaseText from './primitives/base-text.vue';
import BaseLabel from './primitives/base-label.vue';

import { CONFIRM_PASSWORD_LABEL } from '../defaults/DefaultTexts';

export default defineComponent({
  components: {
    BaseInput,
    BaseText,
    BaseLabel,
  },
  setup(): { confirmPasswordLabel: ComputedRef<string> } {
    const confirmPasswordLabel = computed(() =>
      I18n.get(CONFIRM_PASSWORD_LABEL)
    );
    return { confirmPasswordLabel };
  },
});
</script>
