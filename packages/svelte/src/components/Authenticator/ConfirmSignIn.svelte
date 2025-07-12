<script lang="ts">
  import { onMount } from 'svelte';
  import { useAuthenticatorStore } from '../../composables/useAuthenticator';
  import TextField from '../primitives/TextField.svelte';
  import Button from '../primitives/Button.svelte';
  
  const authenticator = useAuthenticatorStore();
  
  let confirmationCode = '';
  
  $: ({
    error,
    isPending,
    submitForm,
    updateForm,
    toSignIn,
    challengeName,
    validationErrors,
  } = $authenticator);
  
  $: challengeMessage = (() => {
    switch (challengeName) {
      case 'SMS_MFA':
        return 'A confirmation code has been sent to your phone';
      case 'SOFTWARE_TOKEN_MFA':
        return 'Enter the code from your authenticator app';
      default:
        return 'Enter your confirmation code';
    }
  })();
  
  function handleCodeInput(event: Event) {
    const target = event.target as HTMLInputElement;
    confirmationCode = target.value;
    updateForm({ name: 'confirmation_code', value: confirmationCode });
  }
  
  function handleSubmit(event: Event) {
    event.preventDefault();
    submitForm({
      confirmation_code: confirmationCode,
    });
  }
  
  function handleBackToSignIn() {
    toSignIn();
  }
  
  onMount(() => {
    confirmationCode = '';
  });
</script>

<div class="amplify-authenticator__confirm-sign-in">
  <form on:submit={handleSubmit} data-amplify-authenticator-confirmsignin>
    <fieldset class="amplify-flex amplify-authenticator__column">
      <div class="amplify-authenticator__header">
        <h3 class="amplify-heading">Confirm Sign In</h3>
        <p class="amplify-text">{challengeMessage}</p>
      </div>
      
      <TextField
        label="Confirmation Code"
        value={confirmationCode}
        on:input={handleCodeInput}
        on:blur={() => updateForm({ name: 'confirmation_code', value: confirmationCode })}
        hasError={!!validationErrors?.confirmation_code}
        errorMessage={validationErrors?.confirmation_code}
        isRequired
        autocomplete="one-time-code"
        placeholder="Enter your code"
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
        loadingText="Confirming..."
        isDisabled={!confirmationCode}
      >
        Confirm
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
  .amplify-authenticator__confirm-sign-in {
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