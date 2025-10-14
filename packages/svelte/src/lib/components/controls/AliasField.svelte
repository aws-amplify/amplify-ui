<script lang="ts">
	import { type FullAutoFill } from 'svelte/elements';
	import { Input, Label, Select, Wrapper } from '../primitives';

	interface PropsInterface {
		label: string;
		name: string;
		placeholder?: string;
		autocomplete?: FullAutoFill;
		labelHidden?: boolean;
		required?: boolean;
		dialCode?: string;
		dialCodeList?: Array<string>;
		type?: string;
		hasError?: boolean;
		describedBy?: string;
	}

	const {
		label = 'Username',
		name = 'username',
		placeholder = '',
		autocomplete = '',
		labelHidden,
		required = true,
		dialCode,
		dialCodeList,
		type = 'text',
		hasError,
		describedBy
	}: PropsInterface = $props();

	const random = Math.floor(Math.random() * 999999);
	const randomPhone = Math.floor(Math.random() * 999999);
</script>

<Wrapper class="amplify-flex amplify-field amplify-textfield amplify-phonenumberfield">
	<Label
		for={`amplify-field-${random}`}
		class={['amplify-label', labelHidden && 'amplify-visually-hidden']}
	>
		{label}
	</Label>
	<Wrapper class="amplify-flex amplify-field-group">
		{#if type === 'tel'}
			<Wrapper class="amplify-field-group__outer-start">
				<Wrapper
					class="amplify-flex amplify-field amplify-selectfield amplify-countrycodeselect amplify-dialcodeselect amplify-authenticator__column"
				>
					<Label for={`amplify-field-${randomPhone}`} class="amplify-label amplify-visually-hidden">
						Country Code
					</Label>
					<Wrapper class="amplify-select__wrapper">
						<Select
							class="amplify-select amplify-field-group__control"
							id={`amplify-field-${randomPhone}`}
							autocomplete="tel-country-code"
							aria-label="country code"
							name="country_code"
							options={dialCodeList}
							selectValue={dialCode}
						/>
						<Wrapper class="amplify-flex amplify-select__icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 24 24"
								class="amplify-icon"
							>
								<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
							</svg>
						</Wrapper>
					</Wrapper>
				</Wrapper>
			</Wrapper>
		{/if}
		<Wrapper class="amplify-field-group__field-wrapper">
			<!--Phone input-->
			<Input
				class="amplify-input amplify-field-group__control"
				id={`amplify-field-${random}`}
				{autocomplete}
				{name}
				{required}
				{type}
				{placeholder}
				aria-invalid={hasError}
				aria-describedby={describedBy}
				autocapitalize="off"
			/>
		</Wrapper>
	</Wrapper>
</Wrapper>
