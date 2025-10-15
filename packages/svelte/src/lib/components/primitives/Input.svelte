<script lang="ts">
  import { type HTMLInputAttributes } from 'svelte/elements';

  interface Props extends HTMLInputAttributes {
    onInput?: (value: string) => void;
  }

  let { onInput, value = $bindable(), ...rest }: Props = $props();

  const handleInput = (e: Event): void => {
    onInput?.((e.target as HTMLInputElement).value);
  };
</script>

<input {...rest} bind:value onchange={(event) => handleInput(event)} data-amplify-input />
