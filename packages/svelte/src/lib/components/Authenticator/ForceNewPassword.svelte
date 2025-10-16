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
  const { getChangePasswordText, getChangingText, getBackToSignInText } = authenticatorTextUtil;

  // Computed Properties
  const changePasswordLabel = $derived.by(() => getChangePasswordText());
  const changingPasswordLabel = $derived.by(() => getChangingText());
  const backSignInText = $derived.by(() => getBackToSignInText());

  // Methods
  const onHaveAccountClicked = (e: Event): void => {
    e.preventDefault();
    authenticator.toSignIn();
  };

  const onForceNewPasswordSubmit = (e: Event): void => {
    e.preventDefault();
    submit(e);
  };

  const submit = (e: Event): void => {
    authenticator.submitForm(getFormDataFromEvent(e));
  };

  const onInput = (e: Event): void => {
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
    data-amplify-authenticator-forcenewpassword
    oninput={onInput}
    onblurcapture={onBlur}
    onsubmit={onForceNewPasswordSubmit}
  >
    <FieldSet class="amplify-flex amplify-authenticator__column" disabled={authenticator.isPending}>
      {#if components?.Header}
        {@render components?.Header()}
      {:else}
        <Heading level="h3" class="amplify-heading">
          {changePasswordLabel}
        </Heading>
      {/if}
      <Wrapper class="amplify-flex amplify-authenticator__column">
        {#if components?.FormFields}
          {@render components?.FormFields()}
        {:else}
          <FormFields route="forceNewPassword" />
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
          {authenticator.isPending ? `${changingPasswordLabel}…` : changePasswordLabel}
        </Button>
        <Button
          class="amplify-field-group__control amplify-authenticator__font"
          fullWidth={false}
          size="small"
          variation="link"
          type="button"
          onclick={onHaveAccountClicked}
        >
          {backSignInText}
        </Button>
        {@render components?.Footer?.()}
      </Footer>
    </FieldSet>
  </Form>
</Wrapper>
