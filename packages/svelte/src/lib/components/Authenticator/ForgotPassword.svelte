<script lang="ts">
	import { authenticatorTextUtil, getFormDataFromEvent, translate } from '@aws-amplify/ui';

	import { useAuthenticator } from '../../stores/authenticator.svelte';
	import { type Components } from '../../types';

	import Form from '../primitives/Form.svelte';
	import Wrapper from '../primitives/Wrapper.svelte';
	import Heading from '../primitives/Heading.svelte';
	import FieldSet from '../primitives/FieldSet.svelte';
	import FormFields from '../primitives/FormFields.svelte';
	import Footer from '../primitives/Footer.svelte';
	import Alert from '../primitives/Alert.svelte';
	import Button from '../controls/Button.svelte';

	interface Props {
		components?: Components;
	}

	const { components }: Props = $props();

	const { submitForm, toSignIn, updateForm, error, isPending } = $derived(useAuthenticator());

	// Text Util
	const { getBackToSignInText, getResetYourPasswordText, getSendCodeText } = authenticatorTextUtil;

	// Computed Properties
	const backSignInText = $derived.by(() => getBackToSignInText());
	const resetPasswordHeading = $derived.by(() => getResetYourPasswordText());
	const sendCodeText = $derived.by(() => getSendCodeText());

	// Methods
	const onResetPasswordSubmit = (e: Event): void => {
		e.preventDefault();
		submitForm(getFormDataFromEvent(e));
	};

	const onInput = (e: Event): void => {
		const { name, value } = e.target as HTMLInputElement;
		updateForm({ name, value });
	};

	const onBackToSignInClicked = (e: Event): void => {
		e.preventDefault();
		toSignIn();
	};
</script>

<Form data-amplify-authenticator-forgotpassword oninput={onInput} onsubmit={onResetPasswordSubmit}>
	<Wrapper class="amplify-flex amplify-authenticator__column">
		{#if components?.Header}
			{@render components?.Header()}
		{:else}
			<Heading class="amplify-heading" level="h3">
				{resetPasswordHeading}
			</Heading>
		{/if}
		<FieldSet class="amplify-flex amplify-authenticator__column" disabled={isPending}>
			{#if components?.FormFields}
				{@render components?.FormFields()}
			{:else}
				<FormFields route="forgotPassword" />
			{/if}
		</FieldSet>

		<Footer class="amplify-flex amplify-authenticator__column">
			{#if error}
				<Alert>
					{translate(error)}
				</Alert>
			{/if}
			<Button
				class="amplify-field-group__control amplify-authenticator__font"
				fullWidth={false}
				variation="primary"
				type="submit"
				disabled={isPending}
			>
				{sendCodeText}
			</Button>
			<Button
				class="amplify-field-group__control amplify-authenticator__font"
				fullWidth={false}
				size="small"
				variation="link"
				fontWeight="normal"
				type="button"
				onclick={onBackToSignInClicked}
			>
				{backSignInText}
			</Button>
			{@render components?.Footer?.()}
		</Footer>
	</Wrapper>
</Form>
