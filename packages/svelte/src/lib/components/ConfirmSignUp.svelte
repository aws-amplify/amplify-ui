<script lang="ts">
  import {
    authState,
    codeDeliveryDetails,
    updateForm,
    submitForm,
    resendCode,
    error,
    isPending,
  } from '$lib/components/authStore';
  import { translate } from '@aws-amplify/ui';
  import AmplifyFormField from './primitives/AmplifyFormField.svelte';
  import AmplifyButton from './primitives/AmplifyButton.svelte';
  import AmplifyError from './primitives/AmplifyError.svelte';
  // translated texts
  const resendCodeText = translate('Resend Code');
  const confirmText = translate('Confirm');

  let confirmSignUpHeading = '';
  let subtitleText = '';

  $: {
    const { DeliveryMedium = {} } = $codeDeliveryDetails;

    confirmSignUpHeading =
      DeliveryMedium === 'EMAIL'
        ? translate('We Emailed You')
        : DeliveryMedium === 'SMS'
        ? translate('We Texted You')
        : translate('We Sent A Code');
  }

  $: {
    const { DeliveryMedium, Destination } = $codeDeliveryDetails;
    subtitleText =
      DeliveryMedium === 'EMAIL'
        ? `Your code is on the way. To log in, enter the code we emailed to ${Destination}. It may take a minute to arrive.`
        : DeliveryMedium === 'SMS'
        ? `Your code is on the way. To log in, enter the code we texted to ${Destination}. It may take a minute to arrive.`
        : translate(
            `Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.`
          );
  }

  function onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    updateForm({ name, value });
  }

  function onSubmit(event: Event): void {
    event.preventDefault();
    submitForm();
  }
</script>

<div data-amplify-container>
  <form
    data-amplify-form
    on:submit|preventDefault={onSubmit}
    on:input={onInput}
  >
    <fieldset
      class="amplify-flex"
      style="flex-direction: column"
      data-amplify-fieldset
      disabled={$isPending}
    >
      <h3 class="amplify-heading" style="font-size: 1.5rem">
        {confirmSignUpHeading}
      </h3>
      <span style="margin-bottom: 1rem">
        {subtitleText}
      </span>
      <AmplifyFormField
        name="confirmation_code"
        type="text"
        autocomplete="one-time-code"
      />

      {#if $error}
        <AmplifyError>
          {$error}
        </AmplifyError>
      {/if}

      <AmplifyButton
        amplify-AmplifyButton
        variation="primary"
        fullWidth="true"
        type="submit"
      >
        {confirmText}
      </AmplifyButton>
      <AmplifyButton
        amplify-button
        fontWeight="normal"
        on:click={() => resendCode()}
      >
        {resendCodeText}
      </AmplifyButton>
    </fieldset>
  </form>
</div>
