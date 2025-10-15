<script lang="ts">
  import { Amplify } from 'aws-amplify';
  import { Authenticator } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';
  import aws_exports from './aws-exports';

  Amplify.configure(aws_exports);
  const formFields = {
    signUp: {
      phone_number: {
        dialCode: '+227',
        dialCodeList: ['+1', '+82', '+227', '+100']
      }
    }
  };
</script>

<Authenticator formFields={formFields} signUpAttributes={['phone_number']}>
  {#snippet children ({ user, signOut })}
    <h1>Hello { user.username }!</h1>
    <button onclick={signOut}>Sign Out</button>
  {/snippet}
</Authenticator>

