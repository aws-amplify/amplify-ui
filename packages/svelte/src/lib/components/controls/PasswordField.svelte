<script lang="ts">
  import { ComponentClassName, translate } from '@aws-amplify/ui';

  import { Input, Label, Wrapper } from '../primitives';
  import { type FullAutoFill } from 'svelte/elements';

  const showPassword = translate('Show password');
  const hidePassword = translate('Hide password');
  let showHideType = $state('password');
  let showHideLabel = $state(showPassword);

  const random = Math.floor(Math.random() * 999999);

  interface PropsInterface {
    name: string;
    label: string;
    autocomplete?: FullAutoFill;
    hasError?: boolean;
    labelHidden?: boolean;
    placeholder?: string | null;
    required?: boolean;
    describedBy?: string;
  }

  const {
    name,
    label,
    autocomplete = 'new-password',
    hasError = false,
    labelHidden,
    placeholder,
    required = true,
    describedBy,
  }: PropsInterface = $props();

  let password = $state('');

  function togglePasswordText(): void {
    showHideLabel =
      showHideLabel === showPassword ? hidePassword : showPassword;
    showHideType = showHideType === 'password' ? 'text' : 'password';
  }

  const placeholderValue = translate(placeholder ?? label);
  const labelValue = translate(label);
</script>

<Wrapper
  class={[
    ComponentClassName.Flex,
    ComponentClassName.Field,
    ComponentClassName.TextField,
    ComponentClassName.PasswordField,
  ]}
>
  <Label
    class={['amplify-label', labelHidden && 'amplify-visually-hidden']}
    for={`amplify-field-${random}`}>{labelValue}</Label
  >
  <Wrapper class={[ComponentClassName.Flex, ComponentClassName.FieldGroup]}>
    <Wrapper class={ComponentClassName.FieldGroupFieldWrapper}>
      <Input
        aria-describedby={describedBy}
        aria-invalid={hasError}
        autocapitalize="off"
        {autocomplete}
        bind:value={password}
        class={[ComponentClassName.Input, ComponentClassName.FieldGroupControl]}
        data-amplify-password="true"
        id={`amplify-field-${random}`}
        {name}
        placeholder={placeholderValue}
        required={required ?? true}
        type={showHideType}
      />
    </Wrapper>
    <Wrapper class={ComponentClassName.FieldGroupOuterEnd}>
      <button
        aria-checked={showHideType !== 'password'}
        aria-label={showHideLabel}
        class={[
          ComponentClassName.Button,
          ComponentClassName.FieldGroupControl,
          ComponentClassName.FieldShowPassword,
        ]}
        data-fullwidth="false"
        onclick={() => togglePasswordText()}
        role="switch"
        type="button"
      >
        {#if showHideType === 'password'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class={ComponentClassName.Icon}
          >
            <path
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            ></path>
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class={ComponentClassName.Icon}
          >
            <path
              d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z"
              fill="none"
            ></path>
            <path
              d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
            ></path>
          </svg>
        {/if}
      </button>
    </Wrapper>
  </Wrapper>
</Wrapper>
