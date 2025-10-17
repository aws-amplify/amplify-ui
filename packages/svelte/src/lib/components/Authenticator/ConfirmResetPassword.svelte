<script lang="ts">
  import {
    authenticatorTextUtil,
    getFormDataFromEvent,
    translate,
  } from '@aws-amplify/ui';

  import { useAuthenticator } from '../../stores/authenticator.svelte';
  import { type Components } from '../../types';

  import Wrapper from '../primitives/Wrapper.svelte';
  import Form from '../primitives/Form.svelte';
  import Button from '../controls/Button.svelte';
  import FieldSet from '../primitives/FieldSet.svelte';
  import FormFields from '../primitives/FormFields.svelte';
  import Heading from '../primitives/Heading.svelte';
  import Footer from '../primitives/Footer.svelte';
  import Alert from '../primitives/Alert.svelte';

  interface Props {
    components?: Components;
  }

  const { components }: Props = $props();

  const { authenticator } = $derived(useAuthenticator());

  // Text Util
  const { getResendCodeText, getResetYourPasswordText, getSubmitText } =
    authenticatorTextUtil;

  // Computed Properties
  const resendCodeText = $derived.by(() => getResendCodeText());
  const confirmResetPasswordHeading = $derived.by(() =>
    getResetYourPasswordText()
  );
  const confirmResetPasswordText = $derived.by(() => getSubmitText());

  // Methods
  const onConfirmResetPasswordSubmit = (e: Event): void => {
    e.preventDefault();
    submit(e);
  };

  const submit = (e: Event): void => {
    authenticator.submitForm(getFormDataFromEvent(e));
  };

  const onLostYourCodeClicked = (e: Event): void => {
    e.preventDefault();
    authenticator.resendCode();
  };

  const onInput = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    authenticator.updateForm({ name, value });
  };

  function onBlur(e: Event) {
    const { name } = e.target as HTMLInputElement;
    authenticator.updateBlur({ name });
  }
</script>

<Wrapper>
  <Form
    data-amplify-authenticator-confirmResetpassword
    oninput={onInput}
    onblurcapture={onBlur}
    onsubmit={onConfirmResetPasswordSubmit}
  >
    <FieldSet
      class="amplify-flex amplify-authenticator__column"
      disabled={authenticator.isPending}
    >
      {#if components?.Header}
        {@render components?.Header()}
      {:else}
        <Heading class="amplify-heading" level="h3">
          {confirmResetPasswordHeading}
        </Heading>
      {/if}
      <Wrapper class="amplify-flex amplify-authenticator__column">
        {#if components?.FormFields}
          {@render components?.FormFields()}
        {:else}
          <FormFields route="confirmResetPassword" />
        {/if}
      </Wrapper>
      <Footer class="amplify-flex amplify-authenticator__column">
        {#if authenticator.error}
          <Alert>
            {translate(authenticator.error)}
          </Alert>
        {/if}
        <Button
          class="amplify-field-group__control amplify-authenticator__font"
          variation="primary"
          fullWidth={false}
          type="submit"
          disabled={authenticator.isPending}
        >
          {confirmResetPasswordText}
        </Button>
        <Button
          class="amplify-field-group__control amplify-authenticator__font"
          variation="link"
          fullWidth={false}
          size="small"
          type="button"
          onclick={onLostYourCodeClicked}
        >
          {resendCodeText}
        </Button>
        {@render components?.Footer?.()}
      </Footer>
    </FieldSet>
  </Form>
</Wrapper>
