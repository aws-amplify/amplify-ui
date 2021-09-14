<template>
  <base-label>
    <base-text>{{ emailAddressLabel }}</base-text>
    <base-input name="email" required type="email"></base-input>
  </base-label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { I18n } from 'aws-amplify';
import { EMAIL_ADDRESS_LABEL } from '../defaults/DefaultTexts';

const emailAddressLabel = computed(() => I18n.get(EMAIL_ADDRESS_LABEL));
</script>
