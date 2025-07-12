<script lang="ts">
  import { useAuthenticatorStore } from '../../composables/useAuthenticator';
  import Button from '../primitives/Button.svelte';
  import type { SocialProvider } from '@aws-amplify/ui';
  
  const authenticator = useAuthenticatorStore();
  
  $: ({ socialProviders, toFederatedSignIn } = $authenticator);
  
  const providerInfo = {
    amazon: {
      displayName: 'Amazon',
      backgroundColor: '#FF9900',
      color: '#FFFFFF',
    },
    apple: {
      displayName: 'Apple',
      backgroundColor: '#000000',
      color: '#FFFFFF',
    },
    facebook: {
      displayName: 'Facebook',
      backgroundColor: '#1877F2',
      color: '#FFFFFF',
    },
    google: {
      displayName: 'Google',
      backgroundColor: '#FFFFFF',
      color: '#757575',
      borderColor: '#DADCE0',
    },
  };
  
  function handleProviderClick(provider: SocialProvider) {
    toFederatedSignIn({ provider });
  }
</script>

{#if socialProviders && socialProviders.length > 0}
  <div class="amplify-authenticator__federated-sign-in">
    <div class="amplify-authenticator__or-container">
      <span class="amplify-authenticator__or-line"></span>
      <span class="amplify-authenticator__or-text">or</span>
      <span class="amplify-authenticator__or-line"></span>
    </div>
    
    <div class="amplify-authenticator__federated-buttons">
      {#each socialProviders as provider}
        {@const info = providerInfo[provider]}
        <button
          type="button"
          class="amplify-button amplify-button--fullwidth amplify-button--social"
          style="background-color: {info.backgroundColor}; color: {info.color}; border-color: {info.borderColor || info.backgroundColor};"
          on:click={() => handleProviderClick(provider)}
        >
          <span class="amplify-button__icon">
            {#if provider === 'google'}
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            {:else if provider === 'facebook'}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            {:else if provider === 'amazon'}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.53.406-3.045.61-4.516.61-2.265 0-4.41-.396-6.435-1.187-2.02-.794-3.82-1.91-5.43-3.35-.1-.074-.15-.15-.15-.22 0-.047.02-.09.05-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045-.195-.166-.375-.332-.526-.496l-.31-.347c-.06-.074-.166-.21-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-1.29.016-2.19.15-2.73.42-.54.283-.82.75-.82 1.403l-.026.178v.6z"/>
              </svg>
            {:else if provider === 'apple'}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            {/if}
          </span>
          Sign in with {info.displayName}
        </button>
      {/each}
    </div>
  </div>
{/if}

<style>
  .amplify-authenticator__federated-sign-in {
    width: 100%;
    margin-bottom: var(--amplify-space-medium);
  }
  
  .amplify-authenticator__or-container {
    display: flex;
    align-items: center;
    margin: var(--amplify-space-large) 0;
  }
  
  .amplify-authenticator__or-line {
    flex: 1;
    height: 1px;
    background-color: var(--amplify-colors-border-secondary);
  }
  
  .amplify-authenticator__or-text {
    padding: 0 var(--amplify-space-medium);
    color: var(--amplify-colors-font-secondary);
    font-size: var(--amplify-font-sizes-small);
    text-transform: uppercase;
  }
  
  .amplify-authenticator__federated-buttons {
    display: flex;
    flex-direction: column;
    gap: var(--amplify-space-small);
  }
  
  .amplify-button--social {
    position: relative;
    border: 1px solid;
    font-weight: var(--amplify-font-weights-normal);
    justify-content: center;
  }
  
  .amplify-button__icon {
    position: absolute;
    left: var(--amplify-space-medium);
    display: flex;
    align-items: center;
  }
</style>