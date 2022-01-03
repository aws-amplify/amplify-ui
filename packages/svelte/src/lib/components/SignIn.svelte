<script lang="ts">
	import AmplifyFormField from './primitives/AmplifyFormField.svelte';
	import AmplifyError from './primitives/AmplifyError.svelte';
	import UserNameAlias from './UserNameAlias.svelte';
	import AmplifyButton from './primitives/AmplifyButton.svelte';
	import { translate } from '@aws-amplify/ui';
	import { updateForm, submitForm, isPending, error, toResetPassword } from '$lib/components/store';

	const forgotPasswordText = translate('Forgot your password? ');
	const signInButtonText = translate('Sign in');
	const signIngButtonText = translate('Signing in');

	function onInput(event: Event) {
		event.preventDefault();
		const { name, value } = <HTMLInputElement>event.target;
		updateForm({ name, value });
	}

	function onSubmit(event: Event): void {
		event.preventDefault();
		submitForm();
	}
</script>

<div data-amplify-container>
	<form data-amplify-form on:submit|preventDefault={onSubmit} on:input={onInput}>
		<fieldset
			class="amplify-flex"
			style="flex-direction: column"
			data-amplify-fieldset
			disabled={$isPending}
		>
			<UserNameAlias />
			<AmplifyFormField
				data-amplify-password
				name="password"
				type="password"
				autocomplete="current-password"
			/>
			<AmplifyButton disabled={$isPending} variation="primary" fullWidth="true" type="submit">
				{$isPending ? signIngButtonText : signInButtonText}
			</AmplifyButton>

			{#if $error}
				<AmplifyError>
					{$error}
				</AmplifyError>
			{/if}
		</fieldset>
	</form>

	<div data-amplify-footer>
		<AmplifyButton
			amplify-button
			fontWeight="normal"
			data-size="small"
			variation="link"
			fullWidth="true"
			on:click={toResetPassword}
		>
			{forgotPasswordText}
		</AmplifyButton>
	</div>
</div>
