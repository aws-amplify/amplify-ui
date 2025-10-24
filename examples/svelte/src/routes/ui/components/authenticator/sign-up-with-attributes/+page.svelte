<script lang="ts">
  import { Amplify } from 'aws-amplify';
  import {
    Authenticator,
    ForceNewPasswordFormFields,
    TextField,
  } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';
  import aws_exports from './aws-exports';

  Amplify.configure(aws_exports);
</script>

{#snippet forceNewPasswordFormFields()}
  <ForceNewPasswordFormFields />
  <TextField
    label="Zone Info"
    id="12233"
    autocomplete="false"
    placeholder="Zone Info"
    name="zoneinfo"
    hideLabel={false}
  />
{/snippet}
<Authenticator
  initialState="signUp"
  components={{
    ForceNewPassword: {
      FormFields: forceNewPasswordFormFields,
    },
  }}
>
  {#snippet children({ user, signOut })}
    <h1>Hello {user.username}!</h1>
    <button onclick={signOut}>Sign Out</button>
  {/snippet}
</Authenticator>
