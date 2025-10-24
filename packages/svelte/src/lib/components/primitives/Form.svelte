<script lang="ts">
  import { type HTMLFormAttributes } from 'svelte/elements';

  const { children, ...rest }: HTMLFormAttributes = $props();
</script>

<form data-amplify-form="" {...rest}>
  {@render children?.()}
</form>
