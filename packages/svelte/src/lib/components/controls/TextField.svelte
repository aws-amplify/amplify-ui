<script lang="ts">
  import { Input, Label, Wrapper } from '../primitives';
  import { type FullAutoFill } from 'svelte/elements';

  interface TextFields {
    label?: string;
    id?: string;
    autocomplete?: FullAutoFill;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    name?: string;
    type?: string;
    hideLabel?: boolean;
  }

  const {
    label = '',
    id = '',
    autocomplete = '',
    placeholder = '',
    required = true,
    disabled = false,
    name = '',
    type = 'text',
    hideLabel = true
  }: TextFields = $props();
</script>

<Label class={['amplify-label', hideLabel && 'amplify-visually-hidden']} for={id}>{label}</Label>
<Wrapper class="amplify-field-group__field-wrapper">
  <Input
    class="amplify-input amplify-field-group__control"
    {id}
    aria-invalid="false"
    {autocomplete}
    {placeholder}
    {required}
    {name}
    {disabled}
    {type}
  />
</Wrapper>
