<script lang="ts">
  import { Amplify } from 'aws-amplify';
  import { Authenticator, authStore } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';
  import aws_exports from './aws-exports';
  Amplify.configure({ ...aws_exports, ssr: true });
  const { signOut, user } = authStore;
</script>

<h1>Welcome to SvelteKit</h1>
<Authenticator>
  <h1>Hello {$user.username}!</h1>
  <button on:click={signOut}>Sign Out</button>
</Authenticator>
