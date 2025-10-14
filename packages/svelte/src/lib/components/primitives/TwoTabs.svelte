<script lang="ts">
	import Wrapper from './Wrapper.svelte';

	const { children } = $props();
</script>

<Wrapper
	tabindex={0}
	aria-orientation="horizontal"
	data-orientation="horizontal"
	class="amplify-authenticator__tabs amplify-tabs"
>
	<Wrapper
		class="amplify-tabs__list amplify-tabs__list--top amplify-tabs__list--equal amplify-authenticator__tabs-wrapper"
		role="tablist"
	>
		{@render children?.()}
	</Wrapper>
</Wrapper>
