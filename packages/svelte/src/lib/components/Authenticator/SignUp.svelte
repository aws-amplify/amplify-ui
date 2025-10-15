<script lang="ts">
  import { authenticatorTextUtil, getFormDataFromEvent, translate } from '@aws-amplify/ui';

  import { useAuthenticator } from '../../stores/authenticator.svelte';
  import { type Components } from '../../types';

  import FederatedSignIn from '../controls/FederatedSignIn.svelte';
  import FormFields from '../primitives/FormFields.svelte';
  import FieldSet from '../primitives/FieldSet.svelte';
  import Form from '../primitives/Form.svelte';
  import Alert from '../primitives/Alert.svelte';
  import Button from '../controls/Button.svelte';
  import Wrapper from '../primitives/Wrapper.svelte';
  import Footer from '../primitives/Footer.svelte';
  import { type HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    components?: Components;
  }

  const { components, ...rest }: Props = $props();

  const { submitForm, updateBlur, updateForm, error, hasValidationErrors, isPending } =
    $derived(useAuthenticator());

  // Text Util
  const { getCreateAccountText } = authenticatorTextUtil;

  // Computed Properties
  const createAccountLabel = $derived.by(() => getCreateAccountText());

  // Methods
  const onInput = (e: Event): void => {
    const { checked, name, type, value } = e.target as HTMLInputElement;

    const isUncheckedCheckbox = type === 'checkbox' && !checked;
    updateForm({
      name,
      value: isUncheckedCheckbox ? undefined : (value as string)
    });
  };

  function onBlur(e: Event) {
    const { name } = e.target as HTMLInputElement;
    updateBlur({ name });
  }

  const onSignUpSubmit = (e: Event): void => {
    e.preventDefault();
    submitForm(getFormDataFromEvent(e));
  };
</script>

<div {...rest}>
  {@render components?.Header?.()}

  <Wrapper>
    <Form oninput={onInput} onblurcapture={onBlur} onsubmit={onSignUpSubmit}>
      <FederatedSignIn />

      <Wrapper class="amplify-flex amplify-authenticator__column">
        <FieldSet class="amplify-flex amplify-authenticator__column" disabled={isPending}>
          {#if components?.FormFields}
            {@render components?.FormFields()}
          {:else}
            <FormFields route="signUp" />
          {/if}
        </FieldSet>
        {#if error}
          <Alert>
            {translate(error)}
          </Alert>
        {/if}
        <Button
          class="amplify-field-group__control amplify-authenticator__font"
          fullWidth={true}
          loading={false}
          variation="primary"
          style="border-radius: 0px; font-weight: normal"
          disabled={isPending || hasValidationErrors}
        >
          {createAccountLabel}
        </Button>
      </Wrapper>
    </Form>
  </Wrapper>

  <Footer>
    {@render components?.Footer?.()}
  </Footer>
</div>
