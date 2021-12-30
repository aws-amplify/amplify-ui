<script lang="ts">
	//tab list
	const tabs = [
		{
			active: true,
			labelledById: '1',
			id: '1',
			title: 'Sign In'
		},
		{
			active: false,
			labelledById: '2',
			id: '2',
			title: 'Sign Up'
		}
	];

	function handleTabClick(e) {
		console.log('here', e);
	}
</script>

<div
	tabindex="0"
	aria-orientation="horizontal"
	data-orientation="horizontal"
	role="tablist"
	style="outline: none"
>
	<div
		class="amplify-flex amplify-tabs"
		data-indicator-position="top"
		style="gap: 0px; justify-content: center"
	>
		{#each tabs as tab}
			<div
				class="amplify-tabs-item"
				data-spacing="equal"
				data-orientation="horizontal"
				role="tab"
				id={tab.labelledById}
				tabindex={tab.active ? 0 : 1}
				aria-selected={tab.active}
				aria-controls={tab.id}
				data-state={tab.active ? 'active' : 'inactive'}
				on:click={() => handleTabClick(tab)}
			>
				{tab.title}
			</div>
		{/each}
	</div>
</div>
