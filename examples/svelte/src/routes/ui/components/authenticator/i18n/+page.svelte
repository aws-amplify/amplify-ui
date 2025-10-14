<script lang="ts">
  import { Authenticator, translations } from '@aws-amplify/ui-svelte';
  import { Amplify } from 'aws-amplify';
  import { I18n } from 'aws-amplify/utils';
  import '@aws-amplify/ui-svelte/styles.css';
  import aws_exports from './aws-exports';

  I18n.putVocabularies(translations);
  I18n.setLanguage('ja');
  I18n.putVocabulariesForLanguage('ja', {
    'Sign In': 'Sign In Custom',
    'User does not exist.': 'Error with your user',
  });

  Amplify.configure(aws_exports);
</script>

<Authenticator initialState="signUp">
  {#snippet children({user, send})}
    <h1 class="mb-10 text-6xl">Hello { user.username }!</h1>
    <button className="px-2 bg-white rounded shadow" onclick={() => send('SIGN_OUT')}>
      Sign Out
    </button>
  {/snippet}
</Authenticator>