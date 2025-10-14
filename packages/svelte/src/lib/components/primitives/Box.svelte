<script lang="ts">
	import { type HTMLAttributes } from 'svelte/elements';

	const { children }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-amplify-box="">
	{@render children?.()}
</div>
