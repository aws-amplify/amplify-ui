import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const formFields = {
  signUp: {
    email: {
      order: 1,
    },
    family_name: {
      order: 2,
    },
    preferred_username: {
      order: 4,
    },
    birthdate: {
      order: 3,
    },
    password: {
      order: 5,
    },
    confirm_password: {
      order: 6,
    },
  },
};
export default function App() {
  return (
    <Authenticator formFields={formFields} initialState="signUp">
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
