<script  lang="ts">
  import { goto } from '$app/navigation';

  import { Amplify } from 'aws-amplify';
  import { useAuthenticator } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';
  import aws_exports from '../aws-exports';

  Amplify.configure(aws_exports);

  const { user, signOut } = $derived(useAuthenticator());
  const handleClick = (event) => {
    event.preventDefault();
    // signOut();
    goto('./')
  };
</script>

<div>Hello, { user?.username }!</div>
<button onclick={handleClick}>Sign Out</button>
