<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  
  type ButtonSize = 'small' | 'medium' | 'large';
  type ButtonVariation = 'primary' | 'link' | 'menu' | 'warning' | 'destructive';
  
  interface $$Props extends HTMLButtonAttributes {
    size?: ButtonSize;
    variation?: ButtonVariation;
    isDisabled?: boolean;
    isFullWidth?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    colorTheme?: 'info' | 'success' | 'warning' | 'error' | 'overlay';
    class?: string;
  }
  
  export let size: ButtonSize = 'medium';
  export let variation: ButtonVariation = 'primary';
  export let isDisabled: boolean = false;
  export let isFullWidth: boolean = false;
  export let isLoading: boolean = false;
  export let loadingText: string = 'Loading...';
  export let colorTheme: 'info' | 'success' | 'warning' | 'error' | 'overlay' | undefined = undefined;
  let className: string = '';
  export { className as class };
  
  const dispatch = createEventDispatcher();
  
  $: disabled = isDisabled || isLoading;
  
  $: classes = [
    'amplify-button',
    `amplify-button--${variation}`,
    `amplify-button--${size}`,
    isFullWidth && 'amplify-button--fullwidth',
    isLoading && 'amplify-button--loading',
    isDisabled && 'amplify-button--disabled',
    className,
  ].filter(Boolean).join(' ');
  
  function handleClick(event: MouseEvent) {
    if (!disabled) {
      dispatch('click', event);
    }
  }
</script>

<button
  {...$$restProps}
  class={classes}
  {disabled}
  data-size={size}
  data-variation={variation}
  data-fullwidth={isFullWidth || undefined}
  data-loading={isLoading || undefined}
  data-disabled={disabled || undefined}
  {colorTheme ? `data-${colorTheme}` : undefined}
  on:click={handleClick}
>
  {#if isLoading && loadingText}
    <span class="amplify-button__loading-text">
      {loadingText}
    </span>
  {:else}
    <slot />
  {/if}
</button>

<style>
  .amplify-button {
    --amplify-internal-button-background-color: var(
      --amplify-components-button-background-color
    );
    --amplify-internal-button-border-color: var(
      --amplify-components-button-border-color
    );
    --amplify-internal-button-color: var(--amplify-components-button-color);
    
    align-items: center;
    background-color: var(--amplify-internal-button-background-color);
    border-color: var(--amplify-internal-button-border-color);
    border-radius: var(--amplify-components-button-border-radius);
    border-style: var(--amplify-components-button-border-style);
    border-width: var(--amplify-components-button-border-width);
    color: var(--amplify-internal-button-color);
    cursor: pointer;
    display: inline-flex;
    font-family: var(--amplify-components-button-font-family);
    font-size: var(--amplify-components-button-font-size);
    font-weight: var(--amplify-components-button-font-weight);
    gap: var(--amplify-components-button-gap);
    justify-content: center;
    line-height: var(--amplify-components-button-line-height);
    padding-block: var(--amplify-components-button-padding-block);
    padding-inline: var(--amplify-components-button-padding-inline);
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all var(--amplify-components-button-transition-duration);
    user-select: none;
  }
  
  .amplify-button:hover:not(:disabled) {
    --amplify-internal-button-background-color: var(
      --amplify-components-button-hover-background-color
    );
    --amplify-internal-button-border-color: var(
      --amplify-components-button-hover-border-color
    );
    --amplify-internal-button-color: var(
      --amplify-components-button-hover-color
    );
  }
  
  .amplify-button:active:not(:disabled) {
    --amplify-internal-button-background-color: var(
      --amplify-components-button-active-background-color
    );
    --amplify-internal-button-border-color: var(
      --amplify-components-button-active-border-color
    );
    --amplify-internal-button-color: var(
      --amplify-components-button-active-color
    );
  }
  
  .amplify-button:focus {
    outline: var(--amplify-components-button-focus-outline);
    outline-offset: var(--amplify-components-button-focus-outline-offset);
  }
  
  .amplify-button:disabled,
  .amplify-button--disabled {
    cursor: not-allowed;
    opacity: var(--amplify-components-button-disabled-opacity);
  }
  
  .amplify-button--fullwidth {
    width: 100%;
  }
  
  .amplify-button--small {
    font-size: var(--amplify-components-button-small-font-size);
    padding-block: var(--amplify-components-button-small-padding-block);
    padding-inline: var(--amplify-components-button-small-padding-inline);
  }
  
  .amplify-button--large {
    font-size: var(--amplify-components-button-large-font-size);
    padding-block: var(--amplify-components-button-large-padding-block);
    padding-inline: var(--amplify-components-button-large-padding-inline);
  }
  
  .amplify-button--primary {
    --amplify-components-button-background-color: var(
      --amplify-components-button-primary-background-color
    );
    --amplify-components-button-border-color: var(
      --amplify-components-button-primary-border-color
    );
    --amplify-components-button-color: var(
      --amplify-components-button-primary-color
    );
  }
  
  .amplify-button--link {
    --amplify-components-button-background-color: transparent;
    --amplify-components-button-border-color: transparent;
    --amplify-components-button-color: var(
      --amplify-components-button-link-color
    );
    text-decoration: underline;
  }
  
  .amplify-button--loading {
    position: relative;
    color: transparent;
  }
  
  .amplify-button__loading-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--amplify-internal-button-color);
  }
</style>