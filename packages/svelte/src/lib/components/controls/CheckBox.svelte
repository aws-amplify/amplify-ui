<script lang="ts">
	import { translate } from '@aws-amplify/ui';

	interface Props {
		errorMessage?: string;
	}

	const { errorMessage = '' }: Props = $props();
	let checked = $state(false);
	const checkboxLabel = translate('I agree with the Terms and Conditions');
</script>

<div class="amplify-flex amplify-field amplify-checkboxfield">
	<label class="amplify-flex amplify-checkbox">
		<span class="amplify-visually-hidden">
			<input
				bind:checked
				class="amplify-input amplify-field-group__control amplify-checkbox__input"
				aria-invalid="false"
				type="checkbox"
				name="acknowledgement"
				value="yes"
			/>
		</span>
		<span
			class={[
				'amplify-flex amplify-checkbox__button',
				!checked && 'amplify-checkbox__button--error'
			]}
			aria-hidden="true"
			data-focus="false"
			data-error={!checked}
			data-checked={checked}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class={{
					'amplify-icon amplify-checkbox__icon': true,
					'amplify-checkbox__icon--checked': checked
				}}
				viewBox="0 0 24 24"
				fill="currentColor"
				data-checked={checked}
			>
				<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
			</svg>
		</span>
		<span class="amplify-text amplify-checkbox__label">
			{checkboxLabel}
		</span>
	</label>
	{#if !checked}
		<p class="amplify-text amplify-field__error-message">
			{errorMessage}
		</p>
	{/if}
</div>
