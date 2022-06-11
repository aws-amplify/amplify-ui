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
import { toRefs } from 'vue';
import { useAuth } from '../composables/useAuth';
const props = defineProps({
  provider: String,
});

const { provider } = toRefs(props);

const { send } = useAuth();

// Methods
const onClick = (): void => {
  send({
    type: 'FEDERATED_SIGN_IN',
    data: {
      provider: provider?.value,
    },
  });
};
</script>
