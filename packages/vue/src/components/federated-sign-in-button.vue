<template>
  <amplify-button
    class="amplify-authenticator__federated-button"
    type="button"
    @click="onClick"
  >
    <slot></slot>
  </amplify-button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

import { useAuthenticator } from '../composables/useAuth';

const props = defineProps<{ provider: string }>();

const { provider } = toRefs(props);

// `useAuthenticator` is casted for temporary type safety on this file.
const { toFederatedSignIn } = useAuthenticator() as AuthenticatorServiceFacade;

// Methods
const onClick = (): void => {
  toFederatedSignIn({ provider: provider.value });
};
</script>
