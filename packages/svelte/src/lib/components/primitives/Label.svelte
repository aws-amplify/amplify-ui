<script lang="ts">
	import { type HTMLLabelAttributes } from 'svelte/elements';

	const { children, ...rest }: HTMLLabelAttributes = $props();
</script>

<label data-amplify-label {...rest}>
	{@render children?.()}
</label>
