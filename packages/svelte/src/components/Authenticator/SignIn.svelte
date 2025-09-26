<script lang="ts">
  import { onMount } from 'svelte';
  import { useAuthenticatorStore } from '../../composables/useAuthenticator';
  import TextField from '../primitives/TextField.svelte';
  import PasswordField from '../primitives/PasswordField.svelte';
  import Button from '../primitives/Button.svelte';
  import FederatedSignIn from './FederatedSignIn.svelte';
  
  const authenticator = useAuthenticatorStore();
  
  let username = '';
  let password = '';
  
  $: ({
    error,
    isPending,
    submitForm,
    updateForm,
    toForgotPassword,
    toSignUp,
    validationErrors,
  } = $authenticator);
  
  function handleUsernameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    username = target.value;
    updateForm({ name: 'username', value: username });
  }
  
  function handlePasswordInput(event: Event) {
    const target = event.target as HTMLInputElement;
    password = target.value;
    updateForm({ name: 'password', value: password });
  }
  
  function handleSubmit(event: Event) {
    event.preventDefault();
    submitForm({
      username,
      password,
    });
  }
  
  function handleForgotPasswordClick() {
    toForgotPassword();
  }
  
  onMount(() => {
    // Clear form on mount
    username = '';
    password = '';
  });
</script>

<div class="amplify-authenticator__sign-in">
  <FederatedSignIn />
  
  <form on:submit={handleSubmit} data-amplify-authenticator-signin>
    <fieldset class="amplify-flex amplify-authenticator__column">
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
      
      <PasswordField
        label="Password"
        value={password}
        on:input={handlePasswordInput}
        on:blur={() => updateForm({ name: 'password', value: password })}
        hasError={!!validationErrors?.password}
        errorMessage={validationErrors?.password}
        isRequired
        autocomplete="current-password"
        placeholder="Enter your password"
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
        loadingText="Signing in..."
        isDisabled={!username || !password}
      >
        Sign in
      </Button>
      
      <Button
        type="button"
        variation="link"
        isFullWidth
        size="small"
        on:click={handleForgotPasswordClick}
      >
        Forgot your password?
      </Button>
    </fieldset>
  </form>
</div>

<style>
  .amplify-authenticator__sign-in {
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