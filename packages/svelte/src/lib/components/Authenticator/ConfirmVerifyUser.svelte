<script lang="ts">
  import { authenticatorTextUtil, getFormDataFromEvent, translate } from '@aws-amplify/ui';

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

  const { error, isPending, submitForm, skipVerification, updateForm } =
    $derived(useAuthenticator());

  // Text Util
  const { getAccountRecoveryInfoText, getSkipText, getSubmitText } = authenticatorTextUtil;

  // Computed Properties
  const verifyHeading = $derived.by(() => getAccountRecoveryInfoText());
  const skipText = $derived.by(() => getSkipText());
  const submitText = $derived.by(() => getSubmitText());

  // Methods
  const onInput = (e: Event): void => {
    const { name, value } = e.target as HTMLInputElement;
    updateForm({ name, value });
  };

  const onConfirmVerifyUserSubmit = (e: Event): void => {
    e.preventDefault();
    submit(e);
  };

  const submit = (e: Event): void => {
    submitForm(getFormDataFromEvent(e));
  };

  const onSkipClicked = (e: Event): void => {
    e.preventDefault();
    skipVerification();
  };
</script>

<Wrapper>
  <Form oninput={onInput} onsubmit={onConfirmVerifyUserSubmit}>
    <FieldSet class="amplify-flex amplify-authenticator__column" disabled={isPending}>
      {#if components?.Header}
        {@render components?.Header()}
      {:else}
        <Heading level="h3" class="amplify-heading">
          {verifyHeading}
        </Heading>
      {/if}
      <Wrapper class="amplify-flex amplify-authenticator__column">
        {#if components?.FormFields}
          {@render components?.FormFields()}
        {:else}
          <FormFields route="confirmVerifyUser" />
        {/if}
      </Wrapper>

      <Footer class="amplify-flex amplify-authenticator__column">
        {#if error}
          <Alert>
            {translate(error)}
          </Alert>
        {/if}
        <Button
          class="amplify-field-group__control amplify-authenticator__font"
          fullWidth={false}
          variation="primary"
          type="submit"
          disabled={isPending}>{submitText}</Button
        >
        <Button
          class="amplify-field-group__control amplify-authenticator__font"
          fullWidth={false}
          size="small"
          variation="link"
          type="button"
          onclick={onSkipClicked}
        >
          {skipText}
        </Button>
        {@render components?.Footer?.()}
      </Footer>
    </FieldSet>
  </Form>
</Wrapper>
