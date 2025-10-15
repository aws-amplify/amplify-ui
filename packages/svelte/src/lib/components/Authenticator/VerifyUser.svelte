<script lang="ts">
  import {
    authenticatorTextUtil,
    censorContactMethod,
    type ContactMethod,
    defaultFormFieldOptions,
    getFormDataFromEvent,
    translate
  } from '@aws-amplify/ui';

  import { useAuthenticator } from '../../stores/authenticator.svelte';
  import { type Components } from '../../types';

  import Wrapper from '../primitives/Wrapper.svelte';
  import Form from '../primitives/Form.svelte';
  import Button from '../controls/Button.svelte';
  import FieldSet from '../primitives/FieldSet.svelte';
  import Heading from '../primitives/Heading.svelte';
  import Footer from '../primitives/Footer.svelte';
  import Alert from '../primitives/Alert.svelte';
  import Text from '../primitives/Text.svelte';
  import Label from '../primitives/Label.svelte';
  import Input from '../primitives/Input.svelte';

  interface Props {
    components?: Omit<Components, 'FormFields'>;
  }

  const { components }: Props = $props();

  const { error, isPending, unverifiedUserAttributes, submitForm, skipVerification, updateForm } =
    $derived(useAuthenticator());

  // Text Util
  const { getAccountRecoveryInfoText, getSkipText, getVerifyText, getVerifyContactText } =
    authenticatorTextUtil;

  // Computed Properties
  const verifyHeading = $derived.by(() => getAccountRecoveryInfoText());
  const skipText = $derived.by(() => getSkipText());
  const verifyText = $derived.by(() => getVerifyText());
  const verifyContactText = $derived.by(() => getVerifyContactText());

  // Methods
  const onInput = (e: Event): void => {
    const { name, value } = e.target as HTMLInputElement;
    updateForm({ name, value });
  };

  const onVerifyUserSubmit = (e: Event): void => {
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

  const getDefaultFormFieldOption = (key: string) => {
    const k = key as keyof typeof defaultFormFieldOptions;
    return defaultFormFieldOptions[k] as { label: ContactMethod };
  };
</script>

<Wrapper>
  <Form oninput={onInput} onsubmit={onVerifyUserSubmit}>
    <FieldSet disabled={isPending} class="amplify-flex amplify-authenticator__column">
      {#if components?.Header}
        {@render components?.Header()}
      {:else}
        <Heading class="amplify-heading" level="h3">
          {verifyHeading}
        </Heading>
      {/if}
      <Wrapper
        class="amplify-flex amplify-field amplify-radiogroupfield amplify-authenticator__column"
      >
        <!-- TODO(BREAKING): remove hard coded string 493c -->
        <Label class="amplify-visually-hidden amplify-label" id="amplify-field-493c">
          {verifyContactText}
        </Label>
        <Wrapper
          class="amplify-flex amplify-field amplify-radiogroupfield amplify-authenticator__column"
          aria-labelledby="amplify-field-493c"
        >
          {#each Object.entries(unverifiedUserAttributes) as [key, value], index (value)}
            {#if value}
              {@const verificationType = getDefaultFormFieldOption(key).label}
              <Label class="amplify-flex amplify-radio" data-amplify-verify-label>
                <Text class="amplify-text amplify-radio__label">
                  {translate(verificationType)}: {censorContactMethod(verificationType, value)}
                </Text>
                <Input
                  class="amplify-input amplify-field-group__control amplify-visually-hidden amplify-radio__input"
                  aria-invalid="false"
                  data-amplify-verify-input
                  name="unverifiedAttr"
                  type="radio"
                  checked={index === 0}
                  value={key}
                ></Input>
                <Text class="amplify-flex amplify-radio__button" aria-hidden="true" />
              </Label>
            {/if}
          {/each}
        </Wrapper>
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
          disabled={isPending}
        >
          {verifyText}
        </Button>
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
