<script lang="ts">
  import '@aws-amplify/ui-svelte/styles.css';
  import { Amplify } from 'aws-amplify';
  import { Authenticator } from '@aws-amplify/ui-svelte';
  import aws_exports from './aws-exports';

  Amplify.configure(aws_exports);
</script>

<Authenticator initialState="forgotPassword">
  {#snippet children ({ user, signOut })}
    <h1>Hello { user.username }!</h1>
    <button onclick={signOut}>Sign Out</button>
  {/snippet}
</Authenticator>
