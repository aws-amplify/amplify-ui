<script lang="ts">
  import { Amplify } from 'aws-amplify';
  import { I18n } from 'aws-amplify/utils';
  import '@aws-amplify/ui-svelte/styles.css';
  import { Authenticator } from '@aws-amplify/ui-svelte';
  import { translations } from '@aws-amplify/ui';
  import aws_exports from './aws-exports';

  Amplify.configure(aws_exports);

  I18n.putVocabularies(translations);
  I18n.setLanguage('en');

  I18n.putVocabulariesForLanguage('en', {
    'CodeMismatchException: Invalid code or auth state for the user.':
      'invalid code'
  });
</script>

<Authenticator>
  {#snippet children ({ user, signOut })}
    <h1>Hello { user.username }!</h1>
    <button onclick={signOut}>Sign Out</button>
  {/snippet}
</Authenticator>
