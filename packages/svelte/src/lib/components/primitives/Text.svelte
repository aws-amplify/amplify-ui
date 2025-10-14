<script lang="ts">
	import { type HTMLAttributes } from 'svelte/elements';

	const { children }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span data-amplify-text="">
	{@render children?.()}
</span>
