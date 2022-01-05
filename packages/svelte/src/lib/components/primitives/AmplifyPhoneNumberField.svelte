<script lang="ts">
	import AmplifyFormSelect from './AmplifyFormSelect.svelte';
	import { nanoid } from 'nanoid';
	import { countryDialCodes } from '@aws-amplify/ui';

	export let autocomplete = 'new-password';
	export let disabled = false;
	export let defaultCountryCode: string;
	export let selectFieldId: string = `amplify-field-${nanoid(12)}`;
	export let textFieldId: string = `amplify-field-${nanoid(12)}`;
	export let initialValue = '';
	export let label = '';
	export let name: string;
	export let placeholder = '';
	export let required = true;
	export let type: string;
	export let labelHidden = false;
</script>

<label class="amplify-label {labelHidden ? 'sr-only' : ''}" for={textFieldId}>
	{label}
</label>
<div class="amplify-flex amplify-phonenumberfield" amplify-field-group style="gap: 0px">
	<div class="amplify-field-group__outer-start">
		<div
			class="
        amplify-flex amplify-field amplify-selectfield amplify-countrycodeselect
      "
			style="flex-direction: column"
		>
			<AmplifyFormSelect
				name="country_code"
				label="Country Code"
				id={selectFieldId}
				items={countryDialCodes}
				defaultValue={defaultCountryCode}
			/>
		</div>
	</div>

	<input
		class="amplify-input"
		id={textFieldId}
		{type}
		{name}
		{placeholder}
		{required}
		value={initialValue}
		{disabled}
		{autocomplete}
	/>
</div>
