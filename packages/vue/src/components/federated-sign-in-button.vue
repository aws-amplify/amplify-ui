<template>
  <amplify-button
    class="
      amplify-field-group__control
      federated-sign-in-button
      amplify-authenticator__font
    "
    :fullwidth="false"
    style="font-weight: normal"
    type="button"
    @click="onClick"
  >
    <base-wrapper
      class="
        amplify-flex
        federated-sign-in-button-row
        amplify-authenticator__sign-in-button-wrapper
      "
    >
      <slot></slot>
    </base-wrapper>
  </amplify-button>
</template>

<script setup lang="ts">
// @xstate
import { useAuth } from '../composables/useAuth';
const { provider } = defineProps({
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
