<script lang="ts">
  import { onMount } from 'svelte';
  import { authState } from '$lib/components/authStore';
  import {
    authInputAttributes,
    LoginMechanism,
    SignUpAttribute,
  } from '@aws-amplify/ui';
  import AmplifyFormField from '../components/primitives/AmplifyFormField.svelte';
  import UserNameAlias from './UserNameAlias.svelte';

  let fieldNames: Array<LoginMechanism | SignUpAttribute> = [];
  let loginMechanism: LoginMechanism;

  onMount(() => {
    const context = $authState.context;

    const { loginMechanisms, signUpAttributes } = context.config;

    fieldNames = Array.from(new Set([...loginMechanisms, ...signUpAttributes]));

    fieldNames = fieldNames.filter((fieldName) => {
      const hasDefaultField = !!authInputAttributes[fieldName];
      if (!hasDefaultField) {
        console.debug(
          `Authenticator does not have a default implementation for ${fieldName}. Customize Authenticator.SignUp.FormFields to add your own.`
        );
      }
      return hasDefaultField;
    });

    // Only 1 is supported, so `['email', 'phone_number']` will only show `email`
    loginMechanism = fieldNames.shift() as LoginMechanism;
  });
</script>

<div class="amplify-flex" style="flex-direction: column" data-amplify-fieldset>
  <UserNameAlias name={loginMechanism} />
  <AmplifyFormField
    name="password"
    type="password"
    autocomplete="new-password"
  />
  <AmplifyFormField
    name="confirm_password"
    label="Confirm Password"
    type="password"
    autocomplete="new-password"
  />

  {#each fieldNames as field}
    <AmplifyFormField name={field} type="text" labelHidden={false} />
  {/each}
</div>
