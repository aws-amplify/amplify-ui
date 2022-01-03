<script lang="ts">
	export let type: 'submit' | 'button' = 'button';
	export let fullWidth: boolean | string = false;
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let variation: 'primary' | 'default' | 'link' = 'default';
	export let fontWeight: 'normal' | 'bold' | 'lighter' = 'normal';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<button
	{...$$restProps}
	on:click={() => dispatch('click')}
	class={`amplify-button ${$$props.class ?? ''}`}
	{type}
	style="font-weight: {fontWeight} "
	data-fullwidth={fullWidth}
	data-size={size}
	data-fontWeight={fontWeight}
	data-variation={variation}
	data-amplify-button=""
>
	<slot />
</button>
