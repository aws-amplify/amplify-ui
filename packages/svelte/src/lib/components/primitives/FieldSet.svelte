<script lang="ts">
	import { type HTMLFieldsetAttributes } from 'svelte/elements';

	const { children, ...rest }: HTMLFieldsetAttributes = $props();
</script>

<fieldset {...rest} data-amplify-fieldset="">
	{@render children?.()}
</fieldset>
