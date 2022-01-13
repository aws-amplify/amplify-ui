<script lang="ts">
  import { getContext } from 'svelte';
  export let active = false;
  export let id: string;
  export let labelledById: string;
  export let tabIndex: number;
</script>

<div
  data-orientation="horizontal"
  role="tabpanel"
  {id}
  aria-labelledby={labelledById}
  data-state={active ? 'active' : 'inactive'}
  tabindex={tabIndex}
>
  {#if active}
    <slot />
  {/if}
</div>
