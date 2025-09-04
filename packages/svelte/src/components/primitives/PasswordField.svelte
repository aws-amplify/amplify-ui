<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TextField from './TextField.svelte';
  import Button from './Button.svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  
  interface $$Props extends Omit<HTMLInputAttributes, 'size' | 'type'> {
    label?: string;
    labelHidden?: boolean;
    size?: 'small' | 'medium' | 'large';
    descriptiveText?: string;
    errorMessage?: string;
    hasError?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    hideShowPassword?: boolean;
    showPasswordText?: string;
    hidePasswordText?: string;
    class?: string;
  }
  
  export let label: string = 'Password';
  export let labelHidden: boolean = false;
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let descriptiveText: string = '';
  export let errorMessage: string = '';
  export let hasError: boolean = false;
  export let isDisabled: boolean = false;
  export let isRequired: boolean = false;
  export let hideShowPassword: boolean = false;
  export let showPasswordText: string = 'Show password';
  export let hidePasswordText: string = 'Hide password';
  export let value: string = '';
  
  let className: string = '';
  export { className as class };
  
  const dispatch = createEventDispatcher();
  
  let showPassword = false;
  
  $: passwordType = showPassword ? 'text' : 'password';
  $: toggleButtonText = showPassword ? hidePasswordText : showPasswordText;
  
  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
  
  function handleChange(event: CustomEvent<string>) {
    value = event.detail;
    dispatch('change', value);
  }
  
  function handleInput(event: Event) {
    dispatch('input', event);
  }
  
  function handleBlur(event: FocusEvent) {
    dispatch('blur', event);
  }
</script>

<div class="amplify-password-field {className}">
  <TextField
    {...$$restProps}
    {label}
    {labelHidden}
    {size}
    {descriptiveText}
    {errorMessage}
    {hasError}
    {isDisabled}
    {isRequired}
    {value}
    type={passwordType}
    class="amplify-password-field__input"
    on:change={handleChange}
    on:input={handleInput}
    on:blur={handleBlur}
  />
  
  {#if !hideShowPassword}
    <Button
      type="button"
      size="small"
      variation="link"
      class="amplify-password-field__show-password-button"
      on:click={togglePasswordVisibility}
      isDisabled={isDisabled}
    >
      {toggleButtonText}
    </Button>
  {/if}
</div>

<style>
  .amplify-password-field {
    position: relative;
    width: 100%;
  }
  
  :global(.amplify-password-field__input .amplify-input) {
    padding-right: calc(var(--amplify-components-input-padding) * 4);
  }
  
  :global(.amplify-password-field__show-password-button) {
    position: absolute;
    right: var(--amplify-components-input-padding);
    top: calc(var(--amplify-components-fieldcontrol-font-size) + var(--amplify-components-field-gap) + var(--amplify-components-input-padding));
  }
  
  :global(.amplify-password-field .amplify-visually-hidden + .amplify-password-field__show-password-button) {
    top: var(--amplify-components-input-padding);
  }
</style>