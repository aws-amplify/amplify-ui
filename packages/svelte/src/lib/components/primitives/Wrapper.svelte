<script lang="ts">
  import { type HTMLAttributes } from 'svelte/elements';

  const { children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...rest}>
  {@render children?.()}
</div>
