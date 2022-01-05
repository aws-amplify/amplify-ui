<script lang="ts">
  import AmplifyFormField from './primitives/AmplifyFormField.svelte';
  import { onMount } from 'svelte';
  import { authState } from '$lib/components/authStore';
  import { getAliasInfoFromContext } from '@aws-amplify/ui';
  export let name: string = 'username';
  export let disabled: boolean = false;
  export let initialValue: string = '';
  export let required: boolean = true;
  let label: string;
  let type: string;
  let error: string;
  let placeholder: string;

  onMount(() => {
    const { label, type } = getAliasInfoFromContext($authState.context);

    placeholder = label;
  });
</script>

<AmplifyFormField
  data-amplify-usernamealias
  {name}
  {label}
  {type}
  {placeholder}
  {initialValue}
  {disabled}
  {required}
  autocomplete="username"
/>
