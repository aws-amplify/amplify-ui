<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

import { Amplify } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);

const router = useRouter();
const { user, signOut } = toRefs(useAuthenticator());
const handleClick = (event: Event) => {
  event.preventDefault();
  signOut();
  router.push('../useAuthenticator');
};
</script>

<template>
  <div>Hello, {{ user?.username }}!</div>
  <button @click="handleClick">Sign Out</button>
</template>
