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
    resendCode,
    codeDeliveryDetails,
    username,
    toSignIn,
    validationErrors,
  } = $authenticator);
  
  $: deliveryMessage = codeDeliveryDetails 
    ? `A confirmation code has been sent to ${codeDeliveryDetails.destination || 'your email'}`
    : 'Enter the confirmation code sent to your email';
  
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
  
  function handleResendCode() {
    resendCode();
  }
  
  onMount(() => {
    confirmationCode = '';
  });
</script>

<div class="amplify-authenticator__confirm-sign-up">
  <form on:submit={handleSubmit} data-amplify-authenticator-confirmsignup>
    <fieldset class="amplify-flex amplify-authenticator__column">
      <div class="amplify-authenticator__header">
        <h3 class="amplify-heading">Confirm Sign Up</h3>
        <p class="amplify-text">{deliveryMessage}</p>
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
      
      <div class="amplify-authenticator__footer">
        <Button
          type="button"
          variation="link"
          size="small"
          on:click={handleResendCode}
          isDisabled={isPending}
        >
          Resend Code
        </Button>
        
        <Button
          type="button"
          variation="link"
          size="small"
          on:click={() => toSignIn()}
        >
          Back to Sign In
        </Button>
      </div>
    </fieldset>
  </form>
</div>

<style>
  .amplify-authenticator__confirm-sign-up {
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
  
  .amplify-authenticator__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--amplify-space-xs);
  }
</style>