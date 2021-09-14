<template>
  <div>
    <base-text>{{ passwordLabel }}</base-text>
    <base-input
      name="password"
      autocomplete="current-password"
      :placeholder="passwordLabel"
      required
      type="password"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PASSWORD_LABEL } from '../defaults/DefaultTexts';
import { I18n } from 'aws-amplify';
const passwordLabel = computed(() => I18n.get(PASSWORD_LABEL));
</script>
