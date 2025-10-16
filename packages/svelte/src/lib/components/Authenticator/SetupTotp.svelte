<script lang="ts">
  import QRCode from 'qrcode';

  import { ConsoleLogger as Logger } from 'aws-amplify/utils';
  import {
    authenticatorTextUtil,
    getFormDataFromEvent,
    getTotpCodeURL,
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
  import { onMount } from 'svelte';

  interface Props {
    components?: Components;
  }

  const { components }: Props = $props();

  const logger = new Logger('SetupTotp-logger');

  const { authenticator } = $derived(useAuthenticator());
  const { totpIssuer = 'AWSCognito', totpUsername } = $derived(
    authenticator.QRFields ?? {}
  );
  const totpCodeURL = $derived.by(() =>
    getTotpCodeURL(
      totpIssuer,
      totpUsername || authenticator.username,
      authenticator.totpSecretCode!
    )
  );

  const qrCode = $state({
    qrCodeImageSource: '',
    isLoading: true,
  });

  // Text Util
  const { getCopyText, getCopiedText, getBackToSignInText, getConfirmText } =
    authenticatorTextUtil;

  let copyTextLabel = $state(getCopyText());

  function copyText() {
    if (authenticator.totpSecretCode) {
      navigator.clipboard.writeText(authenticator.totpSecretCode);
    }
    copyTextLabel = getCopiedText();
  }

  // lifecycle hooks
  onMount(async () => {
    try {
      qrCode.qrCodeImageSource = await QRCode.toDataURL(totpCodeURL);
    } catch (error) {
      logger.error(error);
    } finally {
      qrCode.isLoading = false;
    }
  });

  // Computed Properties
  const backSignInText = $derived.by(() => getBackToSignInText());
  const confirmText = $derived.by(() => getConfirmText());

  // Methods
  const onInput = (e: Event): void => {
    const { name, value } = e.target as HTMLInputElement;
    authenticator.updateForm({ name, value });
  };

  const onSetupTotpSubmit = (e: Event): void => {
    e.preventDefault();
    authenticator.submitForm(getFormDataFromEvent(e));
  };

  const onBackToSignInClicked = (e: Event): void => {
    e.preventDefault();
    authenticator.toSignIn();
  };
</script>

<Wrapper>
  <Form
    data-amplify-authenticator-setup-totp
    oninput={onInput}
    onsubmit={onSetupTotpSubmit}
  >
    <FieldSet
      class="amplify-flex amplify-authenticator__column"
      disabled={authenticator.isPending}
    >
      <Wrapper class="amplify-flex amplify-authenticator__column">
        {#if components?.Header}
          {@render components?.Header()}
        {:else}
          <Heading class="amplify-heading" level="h3">Setup TOTP</Heading>
        {/if}

        <Wrapper class="amplify-flex amplify-authenticator__column">
          {#if qrCode.isLoading}
            <p>Loading...</p>
          {:else}
            <img
              class="amplify-image"
              data-amplify-qrcode
              src={qrCode.qrCodeImageSource}
              alt="qr code"
              width="228"
              height="228"
            />
          {/if}
          <Wrapper class="amplify-flex" data-amplify-copy>
            <div>{authenticator.totpSecretCode}</div>
            <Wrapper data-amplify-copy-svg onclick={copyText}>
              <div data-amplify-copy-tooltip>{copyTextLabel}</div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM15 5H8C6.9 5 6.01 5.9 6.01 7L6 21C6 22.1 6.89 23 7.99 23H19C20.1 23 21 22.1 21 21V11L15 5ZM8 21V7H14V12H19V21H8Z"
                />
              </svg>
            </Wrapper>
          </Wrapper>

          {#if components?.FormFields}
            {@render components?.FormFields()}
          {:else}
            <FormFields route="setupTotp" />
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
            type="submit"
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
      </Wrapper>
    </FieldSet>
  </Form>
</Wrapper>
