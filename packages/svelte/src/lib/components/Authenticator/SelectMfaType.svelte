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
  import Heading from '../primitives/Heading.svelte';
  import Footer from '../primitives/Footer.svelte';
  import Alert from '../primitives/Alert.svelte';
  import Label from '../primitives/Label.svelte';
  import Input from '../primitives/Input.svelte';
  import Text from '../primitives/Text.svelte';

  interface Props {
    components?: Omit<Components, 'FormFields'>;
  }

  const { components }: Props = $props();

  const { authenticator } = $derived(useAuthenticator());

  const random = Math.floor(Math.random() * 999999);
  const {
    getBackToSignInText,
    getConfirmText,
    getSelectMfaTypeByChallengeName,
    getMfaTypeLabelByValue,
    getSelectMfaTypeText,
  } = authenticatorTextUtil;

  const selectMfaTypeHeading = $derived.by(() =>
    getSelectMfaTypeByChallengeName(authenticator.challengeName)
  );
  const backSignInText = $derived.by(() => getBackToSignInText());
  const confirmText = $derived.by(() => getConfirmText());
  const selectMfaTypeText = $derived.by(() => getSelectMfaTypeText());

  const onInput = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    authenticator.updateForm({ name, value });
  };

  const onSelectMfaTypeSubmit = (e: Event) => {
    e.preventDefault();
    authenticator.submitForm(getFormDataFromEvent(e));
  };

  const onBackToSignInClicked = (e: Event) => {
    e.preventDefault();
    authenticator.toSignIn();
  };
</script>

<Wrapper>
  <Form
    data-amplify-authenticator-selectmfatype
    oninput={onInput}
    onsubmit={onSelectMfaTypeSubmit}
  >
    <FieldSet
      class="amplify-flex amplify-authenticator__column"
      disabled={authenticator.isPending}
    >
      {#if components?.Header}
        {@render components?.Header()}
      {:else}
        <Heading level="h3" class="amplify-heading">
          {selectMfaTypeHeading}
        </Heading>
      {/if}
      <Wrapper class="amplify-flex amplify-authenticator__column">
        <Label
          class="amplify-visually-hidden amplify-label"
          id={`amplify-field-${random}`}
        >
          {selectMfaTypeText}
        </Label>
        <Wrapper
          class="amplify-flex amplify-field amplify-radiogroupfield amplify-authenticator__column"
          aria-labelledby={`amplify-field-${random}`}
        >
          {#if authenticator.allowedMfaTypes}
            {#each authenticator.allowedMfaTypes as mfaType, index (mfaType)}
              <Label
                class="amplify-flex amplify-radio"
                data-amplify-selectmfatype-label
              >
                <Text class="amplify-text amplify-radio__label">
                  {getMfaTypeLabelByValue(mfaType)}
                </Text>
                <Input
                  class="amplify-input amplify-field-group__control amplify-visually-hidden amplify-radio__input"
                  aria-invalid="false"
                  data-amplify-selectmfatype-input
                  name="mfa_type"
                  type="radio"
                  value={mfaType}
                  checked={index === 0}
                ></Input>
                <Text
                  class="amplify-flex amplify-radio__button"
                  aria-hidden="true"
                />
              </Label>
            {/each}
          {/if}
        </Wrapper>
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
