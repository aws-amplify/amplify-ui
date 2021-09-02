<template>
  <base-button data-amplify-button type="button" @click="onClick">{{
    text
  }}</base-button>
</template>

<script lang="ts">
import { FederatedIdentityProviders } from '@aws-amplify/ui';
import { defineComponent, PropType } from 'vue';
// @xstate
import { useAuth } from '../composables/useAuth';
import { FederatedSignInButtonReturnTypes } from '../types';
import BaseButton from './primitives/base-button.vue';

export default defineComponent({
  components: { BaseButton },
  props: {
    text: {
      type: String,
      required: true,
    },
    provider: {
      type: String as PropType<FederatedIdentityProviders>,
      required: true,
    },
  },
  setup(props): FederatedSignInButtonReturnTypes {
    const { send } = useAuth();

    // Methods
    const onClick = (e: Event): void => {
      send({
        type: 'FEDERATED_SIGN_IN',
        data: {
          provider: props.provider,
        },
      });
    };
    return { onClick };
  },
});
</script>
