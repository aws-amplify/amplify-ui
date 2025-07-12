<script lang="ts">
  import { onMount } from 'svelte';
  import { useAuthenticatorStore } from '../../composables/useAuthenticator';
  import PasswordField from '../primitives/PasswordField.svelte';
  import Button from '../primitives/Button.svelte';
  
  const authenticator = useAuthenticatorStore();
  
  let newPassword = '';
  let confirmPassword = '';
  
  $: ({
    error,
    isPending,
    submitForm,
    updateForm,
    toSignIn,
    validationErrors,
  } = $authenticator);
  
  $: passwordsMatch = newPassword === confirmPassword;
  $: confirmPasswordError = confirmPassword && !passwordsMatch ? 'Passwords do not match' : '';
  
  function handleInput(event: Event, fieldName: string) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    
    switch (fieldName) {
      case 'password':
        newPassword = value;
        break;
      case 'confirmPassword':
        confirmPassword = value;
        break;
    }
    
    if (fieldName !== 'confirmPassword') {
      updateForm({ name: fieldName, value });
    }
  }
  
  function handleSubmit(event: Event) {
    event.preventDefault();
    
    if (!passwordsMatch) {
      return;
    }
    
    submitForm({
      password: newPassword,
    });
  }
  
  function handleBackToSignIn() {
    toSignIn();
  }
  
  onMount(() => {
    newPassword = '';
    confirmPassword = '';
  });
</script>

<div class="amplify-authenticator__force-new-password">
  <form on:submit={handleSubmit} data-amplify-authenticator-forcenewpassword>
    <fieldset class="amplify-flex amplify-authenticator__column">
      <div class="amplify-authenticator__header">
        <h3 class="amplify-heading">Change Password</h3>
        <p class="amplify-text">
          You must change your password to continue
        </p>
      </div>
      
      <PasswordField
        label="New Password"
        value={newPassword}
        on:input={(e) => handleInput(e, 'password')}
        on:blur={() => updateForm({ name: 'password', value: newPassword })}
        hasError={!!validationErrors?.password}
        errorMessage={validationErrors?.password}
        isRequired
        autocomplete="new-password"
        placeholder="Enter your new password"
      />
      
      <PasswordField
        label="Confirm Password"
        value={confirmPassword}
        on:input={(e) => handleInput(e, 'confirmPassword')}
        hasError={!!confirmPasswordError}
        errorMessage={confirmPasswordError}
        isRequired
        autocomplete="new-password"
        placeholder="Confirm your new password"
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
        loadingText="Changing password..."
        isDisabled={!newPassword || !passwordsMatch}
      >
        Change Password
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
  .amplify-authenticator__force-new-password {
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