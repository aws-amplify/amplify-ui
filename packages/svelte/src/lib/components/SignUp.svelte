<script lang="ts">
  import {
    updateForm,
    submitForm,
    error,
    isPending,
    hasValidationErrors,
  } from '$lib/components/authStore';
  import AmplifyError from './primitives/AmplifyError.svelte';
  import AmplifyButton from './primitives/AmplifyButton.svelte';
  import AmplifySignUpFormFields from './AmplifySignUpFormFields.svelte';

  import { translate } from '@aws-amplify/ui';

  const createAccountText = translate('Create Account');

  function onInput(event: Event) {
    let { checked, name, type, value } = <HTMLInputElement>event.target;

    if (type === 'checkbox' && !checked) value = undefined;
    updateForm({ name, value });
  }

  function onSubmit(event: Event): void {
    submitForm();
  }
</script>

<!-- <button on:click={toSignIn}>To Sign In</button> -->

<form data-amplify-form on:submit|preventDefault={onSubmit} on:input={onInput}>
  <div class="amplify-flex" style="flex-direction: column">
    <div class="amplify-flex" style="flex-direction: column">
      <AmplifySignUpFormFields />
      {#if $error}
        <AmplifyError>
          {$error}
        </AmplifyError>
      {/if}
    </div>

    <AmplifyButton
      disabled={$isPending || $hasValidationErrors}
      amplify-button
      variation="primary"
      fullWidth="true"
      type="submit"
    >
      {createAccountText}
    </AmplifyButton>
  </div>
</form>
