 <script lang="ts">
   import { Amplify } from 'aws-amplify';
   import { signUp, SignUpInput } from 'aws-amplify/auth';
   import { Authenticator } from '@aws-amplify/ui-svelte';
   import '@aws-amplify/ui-svelte/styles.css';
   import aws_exports from './aws-exports';

   Amplify.configure(aws_exports);

  const services = {
    async handleSignUp(input: SignUpInput) {
      // custom username and email
      const { username, options } = input
      const customUsername = username.toLowerCase();
      const customEmail = options?.userAttributes?.email?.toLowerCase();
      return signUp({
        ...input,
        username: customUsername,
        options: {
          ...options,
          userAttributes: {
            ...options?.userAttributes,
            email: customEmail,
          },
        },
      });
    },
  };
</script>
<Authenticator services={services} initialState="signUp">
  {#snippet children({user, signOut})}
    <h1>Hello { user.username }!</h1>
    <button onclick={signOut}>Sign Out</button>
  {/snippet}
</Authenticator>