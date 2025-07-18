<script lang="ts">
  import { onMount } from 'svelte';
  import { useAuthenticatorStore } from '../../composables/useAuthenticator';
  import TextField from '../primitives/TextField.svelte';
  import Button from '../primitives/Button.svelte';
  
  const authenticator = useAuthenticatorStore();
  
  let username = '';
  
  $: ({
    error,
    isPending,
    submitForm,
    updateForm,
    toSignIn,
    validationErrors,
  } = $authenticator);
  
  function handleUsernameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    username = target.value;
    updateForm({ name: 'username', value: username });
  }
  
  function handleSubmit(event: Event) {
    event.preventDefault();
    submitForm({
      username,
    });
  }
  
  function handleBackToSignIn() {
    toSignIn();
  }
  
  onMount(() => {
    username = '';
  });
</script>

<div class="amplify-authenticator__forgot-password">
  <form on:submit={handleSubmit} data-amplify-authenticator-forgotpassword>
    <fieldset class="amplify-flex amplify-authenticator__column">
      <div class="amplify-authenticator__header">
        <h3 class="amplify-heading">Reset your password</h3>
        <p class="amplify-text">
          Enter your username and we'll send you instructions to reset your password.
        </p>
      </div>
      
      <TextField
        label="Username"
        value={username}
        on:input={handleUsernameInput}
        on:blur={() => updateForm({ name: 'username', value: username })}
        hasError={!!validationErrors?.username}
        errorMessage={validationErrors?.username}
        isRequired
        autocomplete="username"
        placeholder="Enter your username"
      />
      
      {#if error}
        <div class="amplify-alert amplify-alert--error" role="alert">
          {error}
        </div>
      {/if}
      
      <Button
        type="submit"
        isFullWidth
        isLoading={isPending}
        loadingText="Sending..."
        isDisabled={!username}
      >
        Send Code
      </Button>
      
      <Button
        type="button"
        variation="link"
        isFullWidth
        size="small"
        on:click={handleBackToSignIn}
      >
        Back to Sign In
      </Button>
    </fieldset>
  </form>
</div>

<style>
  .amplify-authenticator__forgot-password {
    width: 100%;
  }
  
  form {
    width: 100%;
  }
  
  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    gap: var(--amplify-components-authenticator-form-gap);
  }
  
  .amplify-authenticator__header {
    text-align: center;
    margin-bottom: var(--amplify-space-medium);
  }
  
  .amplify-heading {
    font-size: var(--amplify-font-sizes-xl);
    font-weight: var(--amplify-font-weights-bold);
    margin: 0 0 var(--amplify-space-xs) 0;
    color: var(--amplify-colors-font-primary);
  }
  
  .amplify-text {
    font-size: var(--amplify-font-sizes-medium);
    color: var(--amplify-colors-font-secondary);
    margin: 0;
  }
  
  .amplify-alert {
    background-color: var(--amplify-components-alert-background-color);
    border: var(--amplify-components-alert-border);
    border-radius: var(--amplify-components-alert-border-radius);
    color: var(--amplify-components-alert-color);
    padding: var(--amplify-components-alert-padding);
    position: relative;
  }
  
  .amplify-alert--error {
    background-color: var(--amplify-components-alert-error-background-color);
    border-color: var(--amplify-components-alert-error-border-color);
    color: var(--amplify-components-alert-error-color);
  }
  
  .amplify-flex {
    display: flex;
  }
  
  .amplify-authenticator__column {
    flex-direction: column;
  }
</style>