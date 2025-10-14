<script lang="ts">
  import { Amplify } from 'aws-amplify';
  import { Authenticator, Checkbox, SignUpFormFields, useAuthenticator } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';

  import awsExports from './aws-exports';

  Amplify.configure(awsExports);

const { validationErrors } = $derived(useAuthenticator());

const services = {
  async validateCustomSignUp(formData) {
    if (!formData.acknowledgement) {
      return {
        acknowledgement: 'You must agree to the Terms and Conditions',
      };
    }
  },
};
</script>
{#snippet signUpFields()}
  <SignUpFormFields />
  <Checkbox errorMessage={validationErrors.acknowledgement} />
{/snippet}
<Authenticator initialState="signUp" services={services} components={{
  SignUp: {
    FormFields: signUpFields,
  }
}}>
  {#snippet children({user, signOut})}
    <h1>Hello { user.username }!</h1>
    <button onclick={signOut}>Sign Out</button>
  {/snippet}
</Authenticator>