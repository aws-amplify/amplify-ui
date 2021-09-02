<template>
  <base-wrapper
    data-amplify-wrapper
    data-amplify-federated
    v-if="shouldShowFederatedSignIn"
  >
    <federated-sign-in-button
      v-if="includeFacebook"
      text="Sign in with Facebook"
      :provider="fp.Facebook"
    >
    </federated-sign-in-button>
    <federated-sign-in-button
      v-if="includeGoogle"
      text="Sign in with Google"
      :provider="fp.Google"
    >
    </federated-sign-in-button>
    <federated-sign-in-button
      v-if="includeAmazon"
      text="Sign in with Amazon"
      :provider="fp.Amazon"
    >
    </federated-sign-in-button>
  </base-wrapper>
  <base-box data-amplify-strike v-if="shouldShowFederatedSignIn">
    <base-spacer>or</base-spacer>
  </base-box>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { FederatedIdentityProviders } from '@aws-amplify/ui';
import { useAuth } from '../composables/useAuth';
import FederatedSignInButton from './federated-sign-in-button.vue';
import BaseWrapper from './primitives/base-wrapper.vue';
import BaseSpacer from './primitives/base-spacer.vue';
import BaseBox from './primitives/base-box.vue';
import { FederatedSignInReturnTypes } from '../types';

export default defineComponent({
  components: { FederatedSignInButton, BaseWrapper, BaseBox, BaseSpacer },
  setup(): FederatedSignInReturnTypes {
    const { state } = useAuth();
    const {
      value: { context },
    } = state;

    const loginMechanisms = context?.config?.login_mechanisms;

    const includeFacebook = loginMechanisms?.includes('facebook');
    const includeGoogle = loginMechanisms?.includes('google');
    const includeAmazon = loginMechanisms?.includes('amazon');

    const shouldShowFederatedSignIn =
      includeFacebook || includeGoogle || includeAmazon;

    // computed properties

    const fp = computed(() => FederatedIdentityProviders);

    return {
      loginMechanisms,
      fp,
      includeFacebook,
      includeGoogle,
      includeAmazon,
      shouldShowFederatedSignIn,
    };
  },
});
</script>
