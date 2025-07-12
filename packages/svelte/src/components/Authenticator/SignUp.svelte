<script lang="ts">
  import { onMount } from 'svelte';
  import { useAuthenticatorStore } from '../../composables/useAuthenticator';
  import TextField from '../primitives/TextField.svelte';
  import PasswordField from '../primitives/PasswordField.svelte';
  import Button from '../primitives/Button.svelte';
  
  const authenticator = useAuthenticatorStore();
  
  let username = '';
  let password = '';
  let confirmPassword = '';
  let email = '';
  
  $: ({
    error,
    isPending,
    submitForm,
    updateForm,
    toSignIn,
    validationErrors,
  } = $authenticator);
  
  $: passwordsMatch = password === confirmPassword;
  $: confirmPasswordError = confirmPassword && !passwordsMatch ? 'Passwords do not match' : '';
  
  function handleInput(event: Event, fieldName: string) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    
    switch (fieldName) {
      case 'username':
        username = value;
        break;
      case 'password':
        password = value;
        break;
      case 'confirmPassword':
        confirmPassword = value;
        break;
      case 'email':
        email = value;
        break;
    }
    
    updateForm({ name: fieldName, value });
  }
  
  function handleSubmit(event: Event) {
    event.preventDefault();
    
    if (!passwordsMatch) {
      return;
    }
    
    submitForm({
      username,
      password,
      email,
    });
  }
  
  function handleSignInClick() {
    toSignIn();
  }
  
  onMount(() => {
    // Clear form on mount
    username = '';
    password = '';
    confirmPassword = '';
    email = '';
  });
</script>

<div class="amplify-authenticator__sign-up">
  <form on:submit={handleSubmit} data-amplify-authenticator-signup>
    <fieldset class="amplify-flex amplify-authenticator__column">
      <TextField
        label="Username"
        value={username}
        on:input={(e) => handleInput(e, 'username')}
        on:blur={() => updateForm({ name: 'username', value: username })}
        hasError={!!validationErrors?.username}
        errorMessage={validationErrors?.username}
        isRequired
        autocomplete="username"
        placeholder="Enter your username"
      />
      
      <TextField
        label="Email"
        value={email}
        type="email"
        on:input={(e) => handleInput(e, 'email')}
        on:blur={() => updateForm({ name: 'email', value: email })}
        hasError={!!validationErrors?.email}
        errorMessage={validationErrors?.email}
        isRequired
        autocomplete="email"
        placeholder="Enter your email"
      />
      
      <PasswordField
        label="Password"
        value={password}
        on:input={(e) => handleInput(e, 'password')}
        on:blur={() => updateForm({ name: 'password', value: password })}
        hasError={!!validationErrors?.password}
        errorMessage={validationErrors?.password}
        isRequired
        autocomplete="new-password"
        placeholder="Enter your password"
      />
      
      <PasswordField
        label="Confirm Password"
        value={confirmPassword}
        on:input={(e) => handleInput(e, 'confirmPassword')}
        hasError={!!confirmPasswordError}
        errorMessage={confirmPasswordError}
        isRequired
        autocomplete="new-password"
        placeholder="Confirm your password"
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
        loadingText="Creating account..."
        isDisabled={!username || !password || !email || !passwordsMatch}
      >
        Create Account
      </Button>
      
      <div class="amplify-authenticator__sign-up-footer">
        <span>Already have an account?</span>
        <Button
          type="button"
          variation="link"
          size="small"
          on:click={handleSignInClick}
        >
          Sign in
        </Button>
      </div>
    </fieldset>
  </form>
</div>

<style>
  .amplify-authenticator__sign-up {
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
  
  .amplify-authenticator__sign-up-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--amplify-space-xs);
    font-size: var(--amplify-font-sizes-small);
  }
</style>