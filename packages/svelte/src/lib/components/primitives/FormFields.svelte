<script lang="ts">
  import {
    type FormFieldComponents,
    type FormFieldsArray,
    getSortedFormFields
  } from '@aws-amplify/ui';
  import FormField from './FormField.svelte';

  import { useAuth } from '../../stores/authenticator.svelte';
  import { onMount } from 'svelte';

  let formFields: FormFieldsArray = $state([]);

  interface BaseFormFields {
    route: FormFieldComponents;
  }

  const { route }: BaseFormFields = $props();
  const { state: authState } = useAuth();

  onMount(() => {
    formFields = getSortedFormFields(route, authState);
  });
</script>

{#each formFields as [name, formField] (name)}
  <FormField {name} {formField} />
{/each}
