<template>
  <base-button data-amplify-button type="button" @click="onClick">{{
    text
  }}</base-button>
</template>

<script setup lang="ts">
// @xstate
import { useAuth } from '../composables/useAuth';
const { text, provider } = defineProps({
  text: String,
  provider: String,
});

const { send } = useAuth();

// Methods
const onClick = (e: Event): void => {
  send({
    type: 'FEDERATED_SIGN_IN',
    data: {
      provider: provider,
    },
  });
};
</script>
