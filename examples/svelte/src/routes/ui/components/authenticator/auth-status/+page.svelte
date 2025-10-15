<script lang="ts">
  import { Amplify } from 'aws-amplify';
  import { signIn, signOut } from 'aws-amplify/auth';

  import { useAuthenticator } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';
  import aws_exports from './aws-exports';

  Amplify.configure(aws_exports);

  let hasInitialized = $state(false);
  const { authStatus, state: _state, service, send } = $derived(useAuthenticator());
  let isAuthenticated = $derived(authStatus === 'authenticated');

  const handleSignOut = () => signOut();

  const onSubmit = (event: Event) => {
    event.preventDefault();
    signIn(
      Object.fromEntries(new FormData(event.target as HTMLFormElement)) as any
    );
  };
</script>

<form onsubmit={onSubmit}>
  <div>{ authStatus }</div>
  {#if !isAuthenticated}
    <div style="display:flex;flex-direction:column;gap:1rem">
      <label for="username">Username</label>
      <input id="username" name="username" />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" />
      <button type="submit">Sign In</button>
    </div>
  {/if}
  {#if isAuthenticated}
    <button type="button" onclick={handleSignOut}>Sign out</button>
  {/if}
</form>
