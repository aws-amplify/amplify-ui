<script lang="ts">
  import { nanoid } from 'nanoid';
  import { type FullAutoFill } from 'svelte/elements';

  import { type FormFieldOptions, getErrors, translate } from '@aws-amplify/ui';
  import { useAuthenticator } from '../../stores/authenticator.svelte';
  import PasswordField from '../controls/PasswordField.svelte';
  import AliasField from '../controls/AliasField.svelte';

  interface BaseFormField {
    name?: string;
    formField?: FormFieldOptions;
  }

  const { name = '', formField = {} }: BaseFormField = $props();

  const { authenticator } = $derived(useAuthenticator());

  const { type } = formField;

  const isPasswordField = $derived(type === 'password');

  const errorId = nanoid(12);

  const errors = $derived(getErrors(authenticator.validationErrors[name]));
  const hasError = $derived(errors?.length > 0);
  const ariaDescribedBy = $derived(hasError ? errorId : undefined);
  const autocomplete = $derived(
    formField.autocomplete ?? ''
  ) as unknown as FullAutoFill;
</script>

{#if isPasswordField}
  <PasswordField
    {name}
    {hasError}
    {autocomplete}
    label={formField.label ?? ''}
    placeholder={formField.placeholder}
    required={formField.isRequired}
    labelHidden={formField.labelHidden}
    describedBy={ariaDescribedBy}
  />
{:else}
  <AliasField
    {name}
    {hasError}
    {autocomplete}
    label={formField.label ?? ''}
    placeholder={formField.placeholder}
    required={formField.isRequired}
    labelHidden={formField.labelHidden}
    dialCode={formField.dialCode}
    dialCodeList={formField.dialCodeList}
    type={formField.type}
    describedBy={ariaDescribedBy}
  />
{/if}

{#if hasError}
  <div id={ariaDescribedBy}>
    {#each errors as error, idx (idx)}
      <p
        role="alert"
        data-variation="error"
        class="amplify-text amplify-text--error"
      >
        {translate(error)}
      </p>
    {/each}
  </div>
{/if}
