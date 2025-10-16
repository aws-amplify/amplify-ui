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

  const { authenticator } = $derived(useAuthenticator());

  // Text Util
  const { getBackToSignInText, getConfirmText, getChallengeText } = authenticatorTextUtil;

  // Computed Properties
  const confirmSignInHeading = $derived.by(() => getChallengeText(authenticator.challengeName));
  const backSignInText = $derived.by(() => getBackToSignInText());
  const confirmText = $derived.by(() => getConfirmText());

  // Methods
  const onInput = (e: Event): void => {
    const { name, value } = e.target as HTMLInputElement;
    authenticator.updateForm({ name, value });
  };

  const onConfirmSignInSubmit = (e: Event): void => {
    e.preventDefault();
    authenticator.submitForm(getFormDataFromEvent(e));
  };

  const onBackToSignInClicked = (e: Event): void => {
    e.preventDefault();
    authenticator.toSignIn();
  };
</script>

<Wrapper>
  <Form data-amplify-authenticator-confirmsignin oninput={onInput} onsubmit={onConfirmSignInSubmit}>
    <FieldSet class="amplify-flex amplify-authenticator__column" disabled={authenticator.isPending}>
      {#if components?.Header}
        {@render components?.Header()}
      {:else}
        <Heading level="h3" class="amplify-heading">
          {confirmSignInHeading}
        </Heading>
      {/if}

      <Wrapper class="amplify-flex amplify-authenticator__column">
        {#if components?.FormFields}
          {@render components?.FormFields()}
        {:else}
          <FormFields route="confirmSignIn" />
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
          fullWidth={false}
          loading={false}
          variation="primary"
          disabled={authenticator.isPending}
        >
          {confirmText}
        </Button>
        <Button
          class="amplify-field-group__control amplify-authenticator__font"
          fullWidth={false}
          size="small"
          variation="link"
          type="button"
          onclick={onBackToSignInClicked}
        >
          {backSignInText}
        </Button>
        {@render components?.Footer?.()}
      </Footer>
    </FieldSet>
  </Form>
</Wrapper>
