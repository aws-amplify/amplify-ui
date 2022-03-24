<script setup lang="ts">
import { toRefs } from 'vue';
import Amplify from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);

const { user } = toRefs(useAuthenticator());
</script>

<template>
  <div>Hello, {{ user?.username }}!</div>
</template>
