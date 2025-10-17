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
  import Heading from '../primitives/Heading.svelte';
  import Text from '../primitives/Text.svelte';
  import FieldSet from '../primitives/FieldSet.svelte';
  import FormFields from '../primitives/FormFields.svelte';
  import Footer from '../primitives/Footer.svelte';
  import Alert from '../primitives/Alert.svelte';
  import Button from '../controls/Button.svelte';

  interface Props {
    components?: Components;
  }

  const { components }: Props = $props();

  const { authenticator } = $derived(useAuthenticator());

  // Text Util
  const {
    getDeliveryMethodText,
    getDeliveryMessageText,
    getResendCodeText,
    getConfirmText,
  } = authenticatorTextUtil;

  // Only two types of delivery methods is EMAIL or SMS
  const confirmSignUpHeading = $derived.by(() =>
    getDeliveryMethodText(authenticator.codeDeliveryDetails)
  );

  // Computed Properties
  const resendCodeText = $derived.by(() => getResendCodeText());
  const confirmText = $derived.by(() => getConfirmText());
  const subtitleText = $derived.by(() =>
    getDeliveryMessageText(authenticator.codeDeliveryDetails)
  );

  // Methods
  const onInput = (e: Event): void => {
    const { name, value } = e.target as HTMLInputElement;
    authenticator.updateForm({ name, value });
  };

  const onConfirmSignUpSubmit = (e: Event): void => {
    e.preventDefault();
    submit(e);
  };

  const submit = (e: Event): void => {
    authenticator.submitForm(getFormDataFromEvent(e));
  };

  const onLostCodeClicked = (e: Event): void => {
    e.preventDefault();
    authenticator.resendCode();
  };
</script>

<Wrapper>
  <Form oninput={onInput} onsubmit={onConfirmSignUpSubmit}>
    <Wrapper class="amplify-flex amplify-authenticator__column">
      {#if components?.Header}
        {@render components?.Header()}
      {:else}
        <Heading
          class="amplify-heading amplify-authenticator__heading"
          level="h3"
        >
          {confirmSignUpHeading}
        </Heading>
      {/if}
      <Text class="amplify-authenticator__subtitle">
        {subtitleText}
      </Text>
      <FieldSet
        class="amplify-flex amplify-authenticator__column"
        disabled={authenticator.isPending}
      >
        {#if components?.FormFields}
          {@render components?.FormFields()}
        {:else}
          <FormFields route="confirmSignUp" />
        {/if}
      </FieldSet>

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
          type="submit"
          disabled={authenticator.isPending}
        >
          {confirmText}
        </Button>
        <Button
          class="amplify-field-group__control amplify-authenticator__font"
          fullWidth={false}
          variation="default"
          style="font-weight: normal"
          type="button"
          onclick={onLostCodeClicked}
        >
          {resendCodeText}
        </Button>
        {@render components?.Footer?.()}
      </Footer>
    </Wrapper>
  </Form>
</Wrapper>
