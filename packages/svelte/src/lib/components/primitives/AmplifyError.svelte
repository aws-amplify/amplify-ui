<script lang="ts">
	import AmplifyButton from './AmplifyButton.svelte';
	let isVisible = true;

	function close() {
		isVisible = false;
	}
</script>

{#if isVisible}
	<div
		class="amplify-flex amplify-alert"
		data-variation="error"
		style="align-items: center; justify-content: space-between"
		role="alert"
	>
		<div class="amplify-flex" style="align-items: center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="amplify-icon"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
				/>
			</svg>
			<div><slot /></div>
		</div>
		<AmplifyButton
			class="amplify-field-group__control"
			variation="link"
			fullWidth={false}
			on:click={close}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="amplify-icon"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path
					d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
				/>
			</svg>
		</AmplifyButton>
	</div>
{/if}
