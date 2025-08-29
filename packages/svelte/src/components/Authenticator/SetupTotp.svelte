<script lang="ts">
  import { onMount } from 'svelte';
  import QRCode from 'qrcode';
  import { useAuthenticatorStore } from '../../composables/useAuthenticator';
  import TextField from '../primitives/TextField.svelte';
  import Button from '../primitives/Button.svelte';
  
  const authenticator = useAuthenticatorStore();
  
  let confirmationCode = '';
  let qrCodeDataURL = '';
  
  $: ({
    error,
    isPending,
    submitForm,
    updateForm,
    toSignIn,
    totpSecretCode,
    QRFields,
    validationErrors,
  } = $authenticator);
  
  $: if (totpSecretCode && QRFields) {
    generateQRCode();
  }
  
  async function generateQRCode() {
    if (!totpSecretCode || !QRFields) return;
    
    const { totpIssuer, totpUsername } = QRFields;
    const otpAuthUrl = `otpauth://totp/${totpIssuer}:${totpUsername}?secret=${totpSecretCode}&issuer=${totpIssuer}`;
    
    try {
      qrCodeDataURL = await QRCode.toDataURL(otpAuthUrl);
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    }
  }
  
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
  
  function handleSkip() {
    // Skip TOTP setup
    toSignIn();
  }
  
  onMount(() => {
    confirmationCode = '';
  });
</script>

<div class="amplify-authenticator__setup-totp">
  <form on:submit={handleSubmit} data-amplify-authenticator-setuptotp>
    <fieldset class="amplify-flex amplify-authenticator__column">
      <div class="amplify-authenticator__header">
        <h3 class="amplify-heading">Setup Two-Factor Authentication</h3>
        <p class="amplify-text">
          Scan the QR code with your authenticator app or enter the code manually
        </p>
      </div>
      
      {#if qrCodeDataURL}
        <div class="amplify-authenticator__qr-container">
          <img
            src={qrCodeDataURL}
            alt="QR Code for authenticator app"
            class="amplify-authenticator__qr-code"
          />
        </div>
      {/if}
      
      {#if totpSecretCode}
        <div class="amplify-authenticator__totp-secret">
          <p class="amplify-text amplify-text--small">
            Can't scan? Enter this code in your authenticator app:
          </p>
          <code class="amplify-authenticator__totp-secret-code">
            {totpSecretCode}
          </code>
        </div>
      {/if}
      
      <TextField
        label="Verification Code"
        value={confirmationCode}
        on:input={handleCodeInput}
        on:blur={() => updateForm({ name: 'confirmation_code', value: confirmationCode })}
        hasError={!!validationErrors?.confirmation_code}
        errorMessage={validationErrors?.confirmation_code}
        isRequired
        autocomplete="one-time-code"
        placeholder="Enter code from your app"
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
        loadingText="Verifying..."
        isDisabled={!confirmationCode}
      >
        Verify
      </Button>
      
      <Button
        type="button"
        variation="link"
        isFullWidth
        size="small"
        on:click={handleSkip}
      >
        Skip for now
      </Button>
    </fieldset>
  </form>
</div>

<style>
  .amplify-authenticator__setup-totp {
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
  
  .amplify-text--small {
    font-size: var(--amplify-font-sizes-small);
  }
  
  .amplify-authenticator__qr-container {
    display: flex;
    justify-content: center;
    margin: var(--amplify-space-medium) 0;
  }
  
  .amplify-authenticator__qr-code {
    max-width: 200px;
    height: auto;
  }
  
  .amplify-authenticator__totp-secret {
    text-align: center;
    margin: var(--amplify-space-medium) 0;
  }
  
  .amplify-authenticator__totp-secret-code {
    display: block;
    margin-top: var(--amplify-space-xs);
    padding: var(--amplify-space-small);
    background-color: var(--amplify-colors-background-secondary);
    border-radius: var(--amplify-radii-small);
    font-family: var(--amplify-fonts-mono);
    font-size: var(--amplify-font-sizes-medium);
    word-break: break-all;
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