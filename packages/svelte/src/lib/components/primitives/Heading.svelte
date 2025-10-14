<script lang="ts">
	import { type HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	}

	const { level = 'h1', children, ...rest }: Props = $props();
</script>

<svelte:element this={level} {...rest}>
	{@render children?.()}
</svelte:element>
