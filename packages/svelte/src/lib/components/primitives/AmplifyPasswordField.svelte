<script lang="ts">
	import AmplifyButton from './AmplifyButton.svelte';
	import { nanoid } from 'nanoid';
	import { translate } from '@aws-amplify/ui';
	export let autocomplete = 'new-password';
	export let disabled = false;
	export let fieldId: string = `amplify-field-${nanoid(12)}`;
	export let initialValue = '';
	export let label = '';
	export let name: string;
	export let placeholder = '';
	export let required = true;
	export let labelHidden = false;

	export let type: 'text' | 'password' = 'password';

	let showPassword = false;
	let showPasswordButtonlabel = translate('Show password');
	function togglePasswordText() {
		showPassword = !showPassword;
		showPasswordButtonlabel = showPassword
			? translate('Show password')
			: translate('Hide password');
		type = showPassword ? 'text' : 'password';
	}
</script>

<label class="amplify-label {labelHidden ? 'sr-only' : ''}" for={fieldId}>
	{label}
</label>
<div class="amplify-flex amplify-field-group">
	<input
		{...$$restProps}
		class={`amplify-input amplify-field-group__control ${$$props.class}`}
		id={fieldId}
		{type}
		{name}
		{placeholder}
		{required}
		value={initialValue}
		disabled={disabled ? true : false}
		{autocomplete}
	/>
	<div class="amplify-field-group__outer-end">
		<AmplifyButton
			amplify-button
			aria-label={showPasswordButtonlabel}
			class="amplify-field-group__control amplify-field__show-password"
			on:click={togglePasswordText}
		>
			{#if !showPassword}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 24 24"
					class="amplify-icon"
				>
					<path
						d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
					/>
				</svg>
			{/if}
			{#if showPassword}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 24 24"
					class="amplify-icon"
				>
					<path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none" />
					<path
						d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
					/>
				</svg>
			{/if}
		</AmplifyButton>
	</div>
</div>
