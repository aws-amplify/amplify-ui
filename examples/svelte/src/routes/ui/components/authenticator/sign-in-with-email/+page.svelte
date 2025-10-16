<script lang="ts">
  import '@aws-amplify/ui-svelte/styles.css';
  import { Amplify } from 'aws-amplify';
  import { Authenticator, Heading, Text } from '@aws-amplify/ui-svelte';
  import aws_exports from './aws-exports';

  Amplify.configure(aws_exports);

  const formFields = {
    signIn: {
      username: {
        placeholder: 'Enter your cool email',
      },
    },
    confirmVerifyUser: {
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };

  const components = {
    VerifyUser: {
      Header: verifyUserHeader,
      Footer: verifyUserFooter,
    },
    ConfirmVerifyUser: {
      Header: confirmVerifyUserHeader,
      Footer: confirmVerifyUserFooter,
    },
  };
</script>

{#snippet verifyUserHeader()}
  <Heading level="h3">Enter Information:</Heading>
{/snippet}
{#snippet verifyUserFooter()}
  <Text>Footer Information</Text>
{/snippet}
{#snippet confirmVerifyUserHeader()}
  <Heading level="h3">Enter Information:</Heading>
{/snippet}
{#snippet confirmVerifyUserFooter()}
  <Text>Footer Information</Text>
{/snippet}

<Authenticator {formFields} {components} hideSignUp>
  {#snippet children({ user, signOut })}
    <h1>Hello {user.username}!</h1>
    <button onclick={signOut}>Sign Out</button>
  {/snippet}
</Authenticator>
