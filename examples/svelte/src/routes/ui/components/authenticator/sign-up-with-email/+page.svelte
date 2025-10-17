<script lang="ts">
  import { Amplify } from 'aws-amplify';
  import { signUp } from 'aws-amplify/auth';
  import { I18n } from 'aws-amplify/utils';
  import {
    Authenticator,
    translations,
    useAuthenticator,
  } from '@aws-amplify/ui-svelte';
  import '@aws-amplify/ui-svelte/styles.css';
  import aws_exports from './aws-exports';

  Amplify.configure(aws_exports);

  const { authenticator } = $derived(useAuthenticator());

  const formFields = {
    confirmSignUp: {
      confirmation_code: {
        placeholder: 'Enter the code given',
        isRequired: true,
      },
    },
  };

  I18n.putVocabularies(translations);
  I18n.setLanguage('en');
  I18n.putVocabulariesForLanguage('en', {
    'Your code is on the way. To log in, enter the code we emailed to':
      'Enter this code:',
    'It may take a minute to arrive': 'It will take several minutes to arrive',
  });

  const services = {
    async handleSignUp(input) {
      // custom username and email
      const customUsername = input.username.toLowerCase();
      const customEmail = input.options.userAttributes.email.toLowerCase();
      return signUp({
        ...input,
        username: customUsername,
        options: {
          ...input.options,
          userAttributes: {
            ...input.options.userAttributes,
            email: customEmail,
          },
        },
      });
    },
  };
</script>

<p>
  {authenticator.authStatus}
  <Authenticator {services} {formFields} initialState="signUp">
    {#snippet children({ user, signOut })}
      <h1>Hello {user.username}!</h1>
      <button onclick={signOut}>Sign Out</button>
    {/snippet}
  </Authenticator>
</p>
