<script lang="ts">
	import { type HTMLAttributes } from 'svelte/elements';

	const { children, ...rest }: HTMLAttributes<HTMLElement> = $props();
</script>

<footer {...rest}>
	{@render children?.()}
</footer>
