import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';

import { withAuthenticator, translations } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

I18n.putVocabularies(translations);
I18n.setLanguage('en');
I18n.putVocabulariesForLanguage('en', {
  'Password does not conform to policy: Password not long enough':
    'Your password is too short! Try a longer password!',
});

const formFields = {
  signIn: {
    username: {
      dialCode: '+82',
    },
  },
  signUp: {
    phone_number: {
      dialCode: '+227',
      dialCodeList: ['+1', '+82', '+227', '+100'],
    },
  },
};

function App({ user, signOut }) {
  return (
    <>
      <h2>Welcome, {user.username}</h2>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App, {
  formFields: formFields,
});
