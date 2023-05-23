<script setup lang="ts">
import { computed } from 'vue';
import {
  authenticatorTextUtil,
  FederatedIdentityProviders,
} from '@aws-amplify/ui';

import { useAuth, useAuthenticator } from '../composables/useAuth';
import FederatedSignInButton from './federated-sign-in-button.vue';

const { state } = useAuth();
const { route } = useAuthenticator();
const {
  value: { context },
} = state;

const socialProviders = context?.config?.socialProviders;

const includeAmazon = socialProviders?.includes('amazon');
const includeApple = socialProviders?.includes('apple');
const includeFacebook = socialProviders?.includes('facebook');
const includeGoogle = socialProviders?.includes('google');

const shouldShowFederatedSignIn =
  includeFacebook || includeGoogle || includeAmazon || includeApple;

// Text Util
const { getSignInWithFederationText, getOrText } = authenticatorTextUtil;

// Computed Properties

const fp = computed(() => FederatedIdentityProviders);
const signInWithAmazon = computed(() =>
  getSignInWithFederationText(route, 'amazon')
);
const signInWithApple = computed(() =>
  getSignInWithFederationText(route, 'apple')
);
const signInWithFacebook = computed(() =>
  getSignInWithFederationText(route, 'facebook')
);
const signInWithGoogle = computed(() =>
  getSignInWithFederationText(route, 'google')
);
const orText = computed(() => getOrText());
</script>

<template>
  <base-wrapper
    class="amplify-flex federated-sign-in-container amplify-authenticator__column amplify-authenticator__sign-in-base"
    v-if="shouldShowFederatedSignIn"
  >
    <federated-sign-in-button v-if="includeAmazon" :provider="fp.Amazon">
      <svg
        aria-label="Amazon icon"
        class="amplify-icon federated-sign-in-icon"
        viewBox="0 0 248 268"
      >
        <path
          d="M139.056521,147.024612 C133.548808,156.744524 124.782731,162.726926 115.087401,162.726926 C101.790721,162.726926 93.9937779,152.612964 93.9937779,137.68681 C93.9937779,108.224571 120.447551,102.879017 145.533369,102.879017 L145.533369,110.365976 C145.533369,123.831358 145.876354,135.063787 139.056521,147.024612 M207.206992,162.579655 C209.400505,165.692256 209.887066,169.437725 207.063416,171.770186 C199.996315,177.653081 187.429476,188.590967 180.513926,194.716661 L180.46208,194.621133 C178.176838,196.663031 174.862638,196.810303 172.27828,195.445057 C160.780281,185.9162 158.686473,181.494078 152.405048,172.403055 C133.405233,191.751331 119.909143,197.534719 95.309886,197.534719 C66.1281801,197.534719 43.4791563,179.599451 43.4791563,143.669212 C43.4791563,115.616003 58.6782107,96.5105248 80.4019706,87.1727225 C99.2063636,78.9096034 125.464714,77.4528107 145.533369,75.1641337 L145.533369,70.694248 C145.533369,62.4749122 146.167493,52.7510201 141.297893,45.6541312 C137.110277,39.2856386 129.018206,36.6586354 121.859376,36.6586354 C108.658413,36.6586354 96.9171331,43.4171982 94.0416364,57.4199213 C93.4593582,60.532522 91.1701278,63.5933787 88.003492,63.7406501 L54.4387473,60.1424518 C51.6150972,59.5095829 48.4484614,57.2248862 49.2740201,52.8982915 C56.9712583,12.2553679 93.7983558,0 126.732964,0 C143.587124,0 165.606011,4.47386604 178.902691,17.2148315 C195.760839,32.917146 194.149604,53.8694866 194.149604,76.6726704 L194.149604,130.542157 C194.149604,146.734049 200.87372,153.830938 207.206992,162.579655 Z M233.826346,208.038962 C230.467669,203.683255 211.550709,205.9821 203.056405,206.998432 C200.470662,207.321077 200.076227,205.042397 202.406981,203.404973 C217.475208,192.664928 242.201125,195.766353 245.081698,199.363845 C247.966255,202.981502 244.336653,228.071183 230.172839,240.049379 C228.001452,241.888455 225.929671,240.904388 226.89783,238.468418 C230.077218,230.430525 237.204944,212.418868 233.826346,208.038962 Z M126.768855,264 C74.0234043,264 42.0764048,241.955028 17.7852554,217.541992 C12.9733903,212.705982 6.71799208,206.295994 3.31151296,200.690918 C1.90227474,198.372135 5.59096074,195.021875 8.0442063,196.84375 C38.2390146,219.267578 82.1011654,239.538304 125.529506,239.538304 C154.819967,239.538304 191.046475,227.469543 220.66851,214.867659 C225.146771,212.966167 225.146771,219.180222 224.511585,221.060516 C224.183264,222.03242 209.514625,236.221149 189.247207,247.047411 C170.304273,257.166172 146.397132,264 126.768855,264 Z"
          fill="#FF9900"
        ></path>
      </svg>

      <p class="amplify-text amplify-authenticator__federated-text">
        {{ signInWithAmazon }}
      </p>
    </federated-sign-in-button>

    <federated-sign-in-button v-if="includeApple" :provider="fp.Apple">
      <svg
        aria-label="Apple icon"
        class="amplify-icon federated-sign-in-icon"
        fill="#000"
        preserveAspectRatio="xMidYMid"
        stroke="#000"
        strokeWidth="0"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"
        ></path>
      </svg>
      <p class="amplify-text amplify-authenticator__federated-text">
        {{ signInWithApple }}
      </p>
    </federated-sign-in-button>

    <federated-sign-in-button v-if="includeFacebook" :provider="fp.Facebook">
      <svg
        aria-label="Facebook icon"
        class="amplify-icon federated-sign-in-icon"
        viewBox="0 0 279 538"
      >
        <path
          d="M82.3409742,538 L82.3409742,292.936652 L0,292.936652 L0,196.990154 L82.2410458,196.990154 L82.2410458,126.4295 C82.2410458,44.575144 132.205229,0 205.252865,0 C240.227794,0 270.306232,2.59855099 279,3.79788222 L279,89.2502322 L228.536175,89.2502322 C188.964542,89.2502322 181.270057,108.139699 181.270057,135.824262 L181.270057,196.89021 L276.202006,196.89021 L263.810888,292.836708 L181.16913,292.836708 L181.16913,538 L82.3409742,538 Z"
          fill="#1877F2"
        ></path>
      </svg>

      <p class="amplify-text amplify-authenticator__federated-text">
        {{ signInWithFacebook }}
      </p>
    </federated-sign-in-button>

    <federated-sign-in-button v-if="includeGoogle" :provider="fp.Google">
      <svg
        aria-label="Google icon"
        class="amplify-icon federated-sign-in-icon"
        viewBox="0 0 256 262"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
          fill="#4285F4"
        ></path>
        <path
          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
          fill="#34A853"
        ></path>
        <path
          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
          fill="#FBBC05"
        ></path>
        <path
          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
          fill="#EB4335"
        ></path>
      </svg>
      <p class="amplify-text amplify-authenticator__federated-text">
        {{ signInWithGoogle }}
      </p>
    </federated-sign-in-button>
    <hr
      class="amplify-divider amplify-divider--label amplify-divider--small"
      aria-orientation="horizontal"
      data-size="small"
      :data-label="orText"
    />
  </base-wrapper>
</template>
