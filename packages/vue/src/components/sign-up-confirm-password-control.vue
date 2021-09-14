<template>
  <base-label>
    <base-text>{{ confirmPasswordLabel }}</base-text>
    <base-input
      autocomplete="new-password"
      name="confirm_password"
      :placeholder="confirmPasswordLabel"
      required
      type="password"
    ></base-input>
  </base-label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { I18n } from 'aws-amplify';
import { CONFIRM_PASSWORD_LABEL } from '../defaults/DefaultTexts';

const confirmPasswordLabel = computed(() => I18n.get(CONFIRM_PASSWORD_LABEL));
</script>
