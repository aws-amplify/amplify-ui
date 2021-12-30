<script lang="ts">
	export let items: string[];
	export let name: string;
	export let label: string;
	export let id: string;
	export let defaultValue: string;
</script>

<label class="amplify-label sr-only" for={id}>
	{label}
</label>
<div class="amplify-select__wrapper">
	<select
		class="amplify-select amplify-field-group__control"
		autocomplete="tel-country-code"
		{id}
		{name}
	>
		{#each items as item}
			<option value={item} selected={item === defaultValue}>
				{item}
			</option>
		{/each}
	</select>
	<div
		class="amplify-flex amplify-select__icon-wrapper"
		style="align-items: center; justify-content: center"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="amplify-icon"
			viewBox="0 0 24 24"
			data-size="large"
			fill="currentColor"
		>
			<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
		</svg>
	</div>
</div>
