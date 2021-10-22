<template>
  <base-label>
    <base-text>{{ emailAddressLabel }}</base-text>
    <base-input name="email" required type="email"></base-input>
  </base-label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { translate } from '@aws-amplify/ui';

const emailAddressLabel = computed(() => translate('Email'));
</script>
