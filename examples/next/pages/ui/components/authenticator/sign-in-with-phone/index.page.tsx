import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const formFields = {
  signIn: {
    username: {
      dialCode: '+82',
    },
  },
  signUp: {
    phone_number: {
      dialCode: '+227',
      dialCodeList: ['+1', '+82', '+227', '+100', '+227'],
    },
  },
};

function App({ user, signOut }) {
  return (
    <>
      <h2>Welcome, {user.attributes?.phone_number}</h2>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App, { formFields: formFields });
