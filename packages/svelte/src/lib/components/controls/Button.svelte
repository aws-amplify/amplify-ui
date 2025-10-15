<script lang="ts">
  import { type HTMLButtonAttributes } from 'svelte/elements';

  interface PropsInterface extends HTMLButtonAttributes {
    type?: 'submit' | 'button';
    fullWidth?: boolean | string;
    size?: 'small' | 'medium' | 'large';
    variation?: 'primary' | 'default' | 'link';
    fontWeight?: 'normal' | 'bold' | 'lighter';
    loading?: boolean | string;
    disabled?: boolean;
  }

  const {
    type,
    fullWidth,
    size,
    variation,
    fontWeight,
    loading,
    disabled,
    children,
    style,
    ...rest
  }: PropsInterface = $props();
</script>

<button
  {...rest}
  class={{
    'amplify-button': true,
    'amplify-field-group__control': true,
    [`amplify-button--${variation}`]: variation,
    [`amplify-button--${size}`]: size,
    'amplify-button--fullwidth': fullWidth,
    'amplify-button--loading': loading,
    'amplify-button--disabled': disabled
  }}
  {type}
  style={`fontWeight: ${fontWeight || 'normal'} ${style}`}
  data-fullwidth={fullWidth}
  data-size={size}
  data-fontWeight={fontWeight}
  data-variation={variation}
  data-loading={loading}
  data-disabled={disabled}
  {disabled}
  data-amplify-button=""
>
  {@render children?.()}
</button>
