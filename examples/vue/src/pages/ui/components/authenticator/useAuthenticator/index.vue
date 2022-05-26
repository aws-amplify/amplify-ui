<script setup lang="ts">
import { toRefs } from 'vue';
import Amplify from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const { route } = toRefs(useAuthenticator());
const props = useAuthenticator();
</script>

<template>
  <authenticator>
    <template v-slot>
      <router-link to="useAuthenticator/home">
        <button>Navigate to Home</button>
      </router-link>
    </template>
  </authenticator>
</template>
