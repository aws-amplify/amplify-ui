<script lang="ts">
  import {
    authenticatorTextUtil,
    getFormDataFromEvent,
    translate,
  } from '@aws-amplify/ui';

  import { useAuthenticator } from '../../stores/authenticator.svelte';
  import { type Components } from '../../types';

  import FormFields from '../primitives/FormFields.svelte';
  import FieldSet from '../primitives/FieldSet.svelte';
  import Form from '../primitives/Form.svelte';
  import Alert from '../primitives/Alert.svelte';
  import Footer from '../primitives/Footer.svelte';
  import Wrapper from '../primitives/Wrapper.svelte';
  import Button from '../controls/Button.svelte';
  import FederatedSignIn from '../controls/FederatedSignIn.svelte';
  import { type HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    components?: Components;
  }

  const { components, ...rest }: Props = $props();

  const { authenticator } = $derived(useAuthenticator());

  // Text Util
  const { getForgotPasswordText, getSignInText, getSigningInText } =
    authenticatorTextUtil;

  // Computed Properties
  const forgotYourPasswordLink = $derived.by(() => getForgotPasswordText());
  const signInButtonText = $derived.by(() => getSignInText());
  const signingInButtonText = $derived.by(() => getSigningInText());

  // Methods
  const onInput = (e: Event): void => {
    const { name, value } = e.target as HTMLInputElement;
    authenticator.updateForm({ name, value });
  };

  const onSignInSubmit = (e: Event): void => {
    e.preventDefault();
    authenticator.submitForm(getFormDataFromEvent(e));
  };

  const onForgotPasswordClicked = (): void => {
    authenticator.toForgotPassword();
  };
</script>

<div {...rest}>
  {@render components?.Header?.()}
  <Wrapper>
    <Form
      data-amplify-authenticator-signin
      oninput={onInput}
      onsubmit={onSignInSubmit}
      method="post"
    >
      <FederatedSignIn />
      <Wrapper class="amplify-flex amplify-authenticator__column">
        <FieldSet
          disabled={authenticator.isPending}
          class="amplify-flex amplify-authenticator__column"
        >
          <legend class="amplify-visually-hidden">Sign in</legend>
          {#if components?.FormFields}
            {@render components?.FormFields()}
          {:else}
            <FormFields route="signIn" />
          {/if}
        </FieldSet>
        {#if authenticator.error}
          <Alert>{translate(authenticator.error)}</Alert>
        {/if}

        <Button
          disabled={authenticator.isPending}
          class="amplify-field-group__control amplify-authenticator__font"
          fullWidth={true}
          loading={false}
          variation="primary"
        >
          {authenticator.isPending ? signingInButtonText : signInButtonText}
        </Button>
      </Wrapper>
    </Form>
  </Wrapper>

  <Footer>
    {#if components?.Footer}
      {@render components?.Footer()}
    {:else}
      <div data-amplify-footer>
        <Button
          onclick={onForgotPasswordClicked}
          class="amplify-field-group__control amplify-authenticator__font"
          variation="link"
          fullWidth={true}
          size="small"
          fontWeight="normal"
          type="button"
        >
          {forgotYourPasswordLink}
        </Button>
      </div>
    {/if}
  </Footer>
</div>
