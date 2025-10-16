<script lang="ts">
  import { Amplify } from 'aws-amplify';
  import { useAuthenticator } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';
  import aws_exports from '../aws-exports';
  import { goto } from '$app/navigation';

  Amplify.configure(aws_exports);

  const { authenticator } = $derived(useAuthenticator());
  $effect(() => {
    if(authenticator.route === 'signIn') goto('.')
  })
  const handleClick = () => {
    authenticator.signOut()
  }
</script>

<div>Hello, { authenticator.user?.username }!</div>
<button onclick={handleClick}>Sign Out</button>
