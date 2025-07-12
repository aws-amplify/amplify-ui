<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { useAuthenticatorStore } from '../../composables/useAuthenticator';
  import SignIn from './SignIn.svelte';
  import SignUp from './SignUp.svelte';
  import ConfirmSignIn from './ConfirmSignIn.svelte';
  import ConfirmSignUp from './ConfirmSignUp.svelte';
  import ForgotPassword from './ForgotPassword.svelte';
  import ConfirmResetPassword from './ConfirmResetPassword.svelte';
  import SetupTotp from './SetupTotp.svelte';
  import ForceNewPassword from './ForceNewPassword.svelte';
  import type { AuthenticatorProps } from '../../types';
  
  export let initialRoute: AuthenticatorProps['initialRoute'] = undefined;
  export let socialProviders: AuthenticatorProps['socialProviders'] = undefined;
  export let hideSignUp: AuthenticatorProps['hideSignUp'] = false;
  
  const authenticator = useAuthenticatorStore();
  
  $: ({ route, authStatus, user, signOut, initializeMachine } = $authenticator);
  
  // Initialize the machine on mount
  onMount(() => {
    initializeMachine({
      initialRoute,
      socialProviders,
    });
  });
  
  // Component mapping
  const routeComponents = {
    signIn: SignIn,
    signUp: SignUp,
    confirmSignIn: ConfirmSignIn,
    confirmSignUp: ConfirmSignUp,
    forgotPassword: ForgotPassword,
    confirmResetPassword: ConfirmResetPassword,
    setupTotp: SetupTotp,
    forceNewPassword: ForceNewPassword,
    // TODO: Add other routes as they are implemented
    // confirmTotp: ConfirmTotp,
    // verifyUser: VerifyUser,
  };
  
  $: CurrentComponent = routeComponents[route] || null;
  $: isAuthenticated = authStatus === 'authenticated';
</script>

<div class="amplify-authenticator" data-amplify-authenticator>
  {#if isAuthenticated}
    <!-- Authenticated content -->
    <slot authStatus={authStatus} user={user} signOut={signOut} />
  {:else}
    <!-- Authentication forms -->
    <div class="amplify-authenticator__container">
      <div class="amplify-authenticator__tabs">
        {#if route === 'signIn' || route === 'signUp'}
          <button
            class="amplify-tabs__item"
            class:amplify-tabs__item--active={route === 'signIn'}
            on:click={() => $authenticator.toSignIn()}
            type="button"
          >
            Sign In
          </button>
          {#if !hideSignUp}
            <button
              class="amplify-tabs__item"
              class:amplify-tabs__item--active={route === 'signUp'}
              on:click={() => $authenticator.toSignUp()}
              type="button"
            >
              Create Account
            </button>
          {/if}
        {/if}
      </div>
      
      <div class="amplify-authenticator__content">
        {#if CurrentComponent}
          <svelte:component this={CurrentComponent} />
        {:else}
          <div class="amplify-authenticator__loading">
            Loading...
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .amplify-authenticator {
    --amplify-components-authenticator-container-width-max: 28rem;
    --amplify-components-authenticator-container-padding: var(--amplify-space-xl);
    --amplify-components-authenticator-container-gap: var(--amplify-space-xs);
    --amplify-components-authenticator-form-gap: var(--amplify-space-xs);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    width: 100%;
  }
  
  .amplify-authenticator__container {
    background-color: var(--amplify-components-authenticator-container-background-color);
    border: var(--amplify-components-authenticator-container-border);
    border-radius: var(--amplify-components-authenticator-container-border-radius);
    box-shadow: var(--amplify-components-authenticator-container-box-shadow);
    max-width: var(--amplify-components-authenticator-container-width-max);
    padding: var(--amplify-components-authenticator-container-padding);
    width: 100%;
  }
  
  .amplify-authenticator__tabs {
    display: flex;
    justify-content: center;
    margin-bottom: var(--amplify-space-large);
    border-bottom: 1px solid var(--amplify-colors-border-primary);
  }
  
  .amplify-tabs__item {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--amplify-components-tabs-item-color);
    cursor: pointer;
    font-family: var(--amplify-components-tabs-item-font-family);
    font-size: var(--amplify-components-tabs-item-font-size);
    font-weight: var(--amplify-components-tabs-item-font-weight);
    padding: var(--amplify-components-tabs-item-padding);
    text-align: center;
    transition: all var(--amplify-motion-duration-fast);
    flex: 1;
  }
  
  .amplify-tabs__item:hover {
    color: var(--amplify-components-tabs-item-hover-color);
  }
  
  .amplify-tabs__item--active {
    border-bottom-color: var(--amplify-components-tabs-item-active-border-color);
    color: var(--amplify-components-tabs-item-active-color);
  }
  
  .amplify-authenticator__content {
    width: 100%;
  }
  
  .amplify-authenticator__loading {
    text-align: center;
    padding: var(--amplify-space-large);
  }
</style>