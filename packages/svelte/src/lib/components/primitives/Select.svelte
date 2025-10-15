<script lang="ts">
  import { type HTMLSelectAttributes } from 'svelte/elements';

  interface Props extends HTMLSelectAttributes {
    selectValue?: string;
    options?: string[];
    onChange?: (value: string) => void;
  }

  const { selectValue = '', options, onChange, ...rest }: Props = $props();

  const handleChange = (e: Event): void => {
    onChange?.((e.target as HTMLInputElement).value);
  };
</script>

{#if options}
  <select {...rest} onchange={(e) => handleChange(e)}>
    {#each options as option, idx (idx)}
      <option value={option} selected={option === selectValue ? true : undefined}>
        {option}
      </option>
    {/each}
  </select>
{/if}
