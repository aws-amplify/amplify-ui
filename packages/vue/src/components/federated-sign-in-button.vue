<script setup lang="ts">
import { toRefs } from 'vue';
import { useAuthenticator } from '../composables/useAuth';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';
const props = defineProps<{ provider: string }>();

const { provider } = toRefs(props);

const { toFederatedSignIn } = useAuthenticator() as AuthenticatorServiceFacade;

// Methods
const onClick = (): void => {
  toFederatedSignIn({ provider: provider.value });
};
</script>

<template>
  <amplify-button
    class="amplify-field-group__control federated-sign-in-button amplify-authenticator__font"
    :fullwidth="false"
    style="font-weight: normal"
    type="button"
    @click="onClick"
  >
    <base-wrapper
      class="amplify-flex federated-sign-in-button-row amplify-authenticator__sign-in-button-wrapper"
    >
      <slot></slot>
    </base-wrapper>
  </amplify-button>
</template>
