<script lang="ts">
  import { goto } from '$app/navigation';
  import { Amplify } from 'aws-amplify';
  import { Authenticator } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';
  import aws_exports from './aws-exports';

  Amplify.configure(aws_exports);
  const handleClick = () => goto('useAuthenticator/home')
</script>

<Authenticator>
  <button onclick={handleClick}>Navigate to Home</button>
</Authenticator>
