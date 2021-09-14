<template>
  <base-label>
    <base-text>{{ passwordLabel }}</base-text>
    <base-input
      autocomplete="new-password"
      name="password"
      :placeholder="passwordLabel"
      required
      type="password"
    ></base-input>
  </base-label>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { I18n } from 'aws-amplify';
import { PASSWORD_LABEL } from '../defaults/DefaultTexts';

const passwordLabel = computed(() => I18n.get(PASSWORD_LABEL));
</script>
