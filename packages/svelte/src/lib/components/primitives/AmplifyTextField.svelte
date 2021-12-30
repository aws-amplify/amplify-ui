<script lang="ts">
	import { nanoid } from 'nanoid';
	export let autocomplete = 'new-password';
	export let disabled = false;
	export let fieldId: string = `amplify-field-${nanoid(12)}`;
	export let initialValue = '';
	export let label = '';
	export let name: string;
	export let placeholder = '';
	export let required = true;
	export let type: string;
	export let labelHidden = false;
</script>

<label class="amplify-label {labelHidden ? 'sr-only' : ''}" for={fieldId}>
	{label}
</label>
<input
	{...$$restProps}
	class={`amplify-input ${$$props.class}`}
	id={fieldId}
	{type}
	{name}
	{placeholder}
	{required}
	value={initialValue}
	disabled={disabled ? true : false}
	{autocomplete}
/>
