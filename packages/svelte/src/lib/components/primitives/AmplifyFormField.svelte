<script lang="ts">
	import AmplifyPhoneNumberField from './AmplifyPhoneNumberField.svelte';
	import AmplifyPasswordField from './AmplifyPasswordField.svelte';
	import AmplifyTextField from './AmplifyTextField.svelte';
	import AmplifyError from './AmplifyError.svelte';

	import { authState, updateForm, updateBlur } from '$lib/components/store';
	import {
		ActorContextWithForms,
		authInputAttributes,
		AuthInputAttributes,
		getActorContext,
		translate
	} from '@aws-amplify/ui';

	import { onMount } from 'svelte';

	export let name: string;
	export let type: string;
	export let required = true;
	export let placeholder = '';
	export let label = '';
	export let initialValue = '';
	export let disabled = false;
	export let autocomplete = '';
	export let labelHidden = true;

	const getAttributeMap: AttributeInfoProvider = () => authInputAttributes;
	type AttributeInfoProvider = () => AuthInputAttributes;

	let defaultCountryCode: string;
	onMount(() => {
		if (isPhoneField()) {
			const state = $authState;
			const { country_code }: ActorContextWithForms = getActorContext(state);
			defaultCountryCode = country_code;

			// TODO: remove this side-effect
			updateForm()({
				name: 'country_code',
				value: country_code
			});
		}
	});

	// function attributeMap(): AuthInputAttributes {
	// 	return getAttributeMap();
	// }

	const attributeMap = getAttributeMap();

	function error(): string {
		const formContext: ActorContextWithForms = getActorContext($authState);
		const { validationError } = formContext;
		return translate(validationError[name]);
	}

	function onBlur($event: Event) {
		let { name } = <HTMLInputElement>$event.target;

		updateBlur()({ name });
	}

	function inferLabel(): string {
		const myLabel = label || attributeMap[name]?.label;
		return translate<string>(myLabel);
	}

	// function inferPlaceholder(): string {
	let inferPlaceholder;
	$: {
		const myPlaceholder = placeholder || attributeMap[name]?.placeholder || inferLabel();
		inferPlaceholder = translate<string>(myPlaceholder);
	}
	// }

	// infers what the `type` of underlying input element should be.
	function inferType(): string {
		return type ?? attributeMap[name]?.type ?? 'text';
	}

	function inferAutocomplete(): string {
		return autocomplete || attributeMap[name]?.autocomplete;
	}

	// TODO(enhancement): use enum to differentiate special field types
	function isPasswordField(): boolean {
		return inferType() === 'password';
	}

	function isPhoneField(): boolean {
		return inferType() === 'tel';
	}
</script>

<div class="amplify-flex amplify-field" style="flex-direction: column">
	<!-- Country code field -->
	{#if isPhoneField()}
		<AmplifyPhoneNumberField
			{defaultCountryCode}
			type={inferType()}
			{name}
			label={inferLabel()}
			placeholder={inferPlaceholder}
			{required}
			{initialValue}
			{disabled}
			{labelHidden}
			autocomplete={inferAutocomplete()}
		/>
	{/if}

	{#if isPasswordField()}
		<AmplifyPasswordField
			{...$$restProps}
			{name}
			label={inferLabel()}
			placeholder={inferPlaceholder}
			{required}
			{initialValue}
			{disabled}
			{labelHidden}
			autocomplete={inferAutocomplete()}
		/>
	{/if}

	{#if !isPasswordField() && !isPhoneField()}
		<AmplifyTextField
			type={inferType()}
			{name}
			label={inferLabel()}
			placeholder={inferPlaceholder}
			{required}
			{initialValue}
			{disabled}
			{labelHidden}
			autocomplete={inferAutocomplete()}
		/>
	{/if}

	{#if error()}
		<AmplifyError>
			{error()}
		</AmplifyError>
	{/if}
</div>
