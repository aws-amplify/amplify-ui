<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  
  interface $$Props extends Omit<HTMLInputAttributes, 'size' | 'type'> {
    label?: string;
    labelHidden?: boolean;
    size?: 'small' | 'medium' | 'large';
    variation?: 'quiet';
    descriptiveText?: string;
    errorMessage?: string;
    hasError?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    isReadOnly?: boolean;
    type?: HTMLInputAttributes['type'];
    class?: string;
  }
  
  export let label: string = '';
  export let labelHidden: boolean = false;
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let variation: 'quiet' | undefined = undefined;
  export let descriptiveText: string = '';
  export let errorMessage: string = '';
  export let hasError: boolean = false;
  export let isDisabled: boolean = false;
  export let isRequired: boolean = false;
  export let isReadOnly: boolean = false;
  export let type: HTMLInputAttributes['type'] = 'text';
  export let value: string = '';
  
  let className: string = '';
  export { className as class };
  
  const dispatch = createEventDispatcher();
  
  $: fieldId = `amplify-field-${Math.random().toString(36).slice(2, 9)}`;
  $: describedById = descriptiveText ? `${fieldId}-description` : undefined;
  $: errorId = hasError && errorMessage ? `${fieldId}-error` : undefined;
  $: ariaDescribedBy = [describedById, errorId].filter(Boolean).join(' ') || undefined;
  
  $: fieldClasses = [
    'amplify-field',
    `amplify-field--${size}`,
    variation && `amplify-field--${variation}`,
    hasError && 'amplify-field--error',
    className,
  ].filter(Boolean).join(' ');
  
  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    value = event.currentTarget.value;
    dispatch('input', event);
    dispatch('change', value);
  }
  
  function handleBlur(event: FocusEvent) {
    dispatch('blur', event);
  }
</script>

<div class={fieldClasses} data-size={size} data-variation={variation}>
  {#if label}
    <label
      for={fieldId}
      class="amplify-label"
      class:amplify-visually-hidden={labelHidden}
    >
      {label}
      {#if isRequired}
        <span class="amplify-field__required">*</span>
      {/if}
    </label>
  {/if}
  
  <input
    {...$$restProps}
    id={fieldId}
    {type}
    {value}
    class="amplify-input"
    disabled={isDisabled}
    readOnly={isReadOnly}
    required={isRequired}
    aria-invalid={hasError || undefined}
    aria-describedby={ariaDescribedBy}
    data-amplify-input
    on:input={handleInput}
    on:blur={handleBlur}
  />
  
  {#if descriptiveText && !hasError}
    <div id={describedById} class="amplify-field__description">
      {descriptiveText}
    </div>
  {/if}
  
  {#if hasError && errorMessage}
    <div id={errorId} class="amplify-field__error-message">
      {errorMessage}
    </div>
  {/if}
</div>

<style>
  .amplify-field {
    display: flex;
    flex-direction: column;
    gap: var(--amplify-components-field-gap);
    width: 100%;
  }
  
  .amplify-label {
    color: var(--amplify-components-fieldcontrol-color);
    font-size: var(--amplify-components-fieldcontrol-font-size);
    font-weight: var(--amplify-components-fieldcontrol-font-weight);
    line-height: var(--amplify-components-fieldcontrol-line-height);
  }
  
  .amplify-field__required {
    color: var(--amplify-components-field-label-required-color);
  }
  
  .amplify-input {
    background-color: var(--amplify-components-input-background-color);
    border: var(--amplify-components-input-border-width) var(--amplify-components-input-border-style) var(--amplify-components-input-border-color);
    border-radius: var(--amplify-components-input-border-radius);
    color: var(--amplify-components-input-color);
    font-family: var(--amplify-components-input-font-family);
    font-size: var(--amplify-components-input-font-size);
    font-weight: var(--amplify-components-input-font-weight);
    line-height: var(--amplify-components-input-line-height);
    padding: var(--amplify-components-input-padding);
    width: 100%;
  }
  
  .amplify-input:focus {
    border-color: var(--amplify-components-input-focus-border-color);
    outline: none;
    box-shadow: 0 0 0 2px var(--amplify-components-input-focus-box-shadow-color);
  }
  
  .amplify-input:disabled {
    background-color: var(--amplify-components-input-disabled-background-color);
    color: var(--amplify-components-input-disabled-color);
    cursor: not-allowed;
    opacity: var(--amplify-components-input-disabled-opacity);
  }
  
  .amplify-field--error .amplify-input {
    border-color: var(--amplify-components-fieldcontrol-error-border-color);
  }
  
  .amplify-field__description {
    color: var(--amplify-components-field-description-color);
    font-size: var(--amplify-components-field-description-font-size);
  }
  
  .amplify-field__error-message {
    color: var(--amplify-components-fieldcontrol-error-color);
    font-size: var(--amplify-components-field-error-font-size);
  }
  
  .amplify-field--small .amplify-input {
    font-size: var(--amplify-components-input-small-font-size);
    padding: var(--amplify-components-input-small-padding);
  }
  
  .amplify-field--large .amplify-input {
    font-size: var(--amplify-components-input-large-font-size);
    padding: var(--amplify-components-input-large-padding);
  }
  
  .amplify-field--quiet .amplify-input {
    background-color: transparent;
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0;
  }
  
  .amplify-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>