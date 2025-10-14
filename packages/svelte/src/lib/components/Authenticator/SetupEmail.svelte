<script lang="ts">
	import { authenticatorTextUtil, getFormDataFromEvent, translate } from '@aws-amplify/ui';
	import { useAuthenticator } from '../../stores/authenticator.svelte';
	import { type Components } from '../../types';

	import Wrapper from '../primitives/Wrapper.svelte';
	import Form from '../primitives/Form.svelte';
	import Button from '../controls/Button.svelte';
	import FieldSet from '../primitives/FieldSet.svelte';
	import FormFields from '../primitives/FormFields.svelte';
	import Heading from '../primitives/Heading.svelte';
	import Footer from '../primitives/Footer.svelte';
	import Alert from '../primitives/Alert.svelte';

	interface Props {
		components?: Components;
	}

	const { components }: Props = $props();

	const { error, isPending, submitForm, toSignIn, updateForm } = $derived(useAuthenticator());
	const { getBackToSignInText, getConfirmText, getSetupEmailText } = authenticatorTextUtil;
	const setupEmailHeading = $derived.by(() => getSetupEmailText());
	const backSignInText = $derived.by(() => getBackToSignInText());
	const confirmText = $derived.by(() => getConfirmText());

	const onInput = (e: Event) => {
		const { name, value } = e.target as HTMLInputElement;
		updateForm({ name, value });
	};

	const onSetupEmailSubmit = (e: Event) => {
		e.preventDefault();
		submitForm(getFormDataFromEvent(e));
	};

	const onBackToSignInClicked = (e: Event) => {
		e.preventDefault();
		toSignIn();
	};
</script>

<Wrapper>
	<Form data-amplify-authenticator-setupemail oninput={onInput} onsubmit={onSetupEmailSubmit}>
		<FieldSet class="amplify-flex amplify-authenticator__column" disabled={isPending}>
			{#if components?.Header}
				{@render components?.Header()}
			{:else}
				<Heading level="h3" class="amplify-heading">
					{setupEmailHeading}
				</Heading>
			{/if}
			<Wrapper class="amplify-flex amplify-authenticator__column">
				{#if components?.FormFields}
					{@render components?.FormFields()}
				{:else}
					<FormFields route="setupEmail" />
				{/if}
			</Wrapper>
			<Footer class="amplify-flex amplify-authenticator__column">
				{#if error}
					<Alert>
						{translate(error)}
					</Alert>
				{/if}
				<Button
					class="amplify-field-group__control amplify-authenticator__font"
					fullWidth={false}
					loading={false}
					variation="primary"
					fontWeight="normal"
					disabled={isPending}
				>
					{confirmText}
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
		</FieldSet>
	</Form>
</Wrapper>
