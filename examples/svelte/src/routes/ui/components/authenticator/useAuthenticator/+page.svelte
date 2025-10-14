<script lang="ts">
  import { Amplify } from 'aws-amplify';
  import { Authenticator } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';
  import aws_exports from './aws-exports';

  Amplify.configure(aws_exports);
</script>

<Authenticator>
  <a href="./useAuthenticator/home">Navigate to Home</a>
</Authenticator>
