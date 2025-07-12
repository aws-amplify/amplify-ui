<script lang="ts">
  import { Authenticator } from '@aws-amplify/ui-svelte';
  import { Amplify } from 'aws-amplify';
  import awsExports from './aws-exports';
  
  Amplify.configure(awsExports);
  
  // Check for URL parameters to enable different features
  const params = new URLSearchParams(window.location.search);
  const hideSignUp = params.get('hideSignUp') === 'true';
  const socialProviders = params.get('socialProviders')?.split(',') || [];
</script>

<main>
  <h1>Amplify Svelte Authenticator</h1>
  
  <Authenticator 
    {hideSignUp}
    socialProviders={socialProviders.length > 0 ? socialProviders : undefined}
    let:authStatus 
    let:user 
    let:signOut
  >
    <div class="authenticated-content">
      <h2>Hello {user?.username}</h2>
      <p>You are signed in!</p>
      <div id="auth-status">Sign out</div>
      <div id="custom-authenticated-content">Custom authenticated content</div>
      
      <button on:click={signOut} class="sign-out-button">
        Sign out
      </button>
    </div>
  </Authenticator>
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .authenticated-content {
    text-align: center;
    padding: 2rem;
    background-color: #f5f5f5;
    border-radius: 8px;
  }

  .sign-out-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #ff3e00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .sign-out-button:hover {
    background-color: #ff5a00;
  }

  #custom-authenticated-content {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #e0e0e0;
    border-radius: 4px;
  }
</style>