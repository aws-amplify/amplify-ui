import { Amplify, Auth } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator initialState="signUp">
      {({ signOut, user }) => (
        <>
          {user.attributes.email}
          <button
            onClick={() => Auth.currentAuthenticatedUser().then(console.log)}
          >
            Get Authenticated User
          </button>
          <button onClick={() => user.getUserData(console.error)}>
            Get user data
          </button>
          <button onClick={() => console.log(user.attributes)}>
            Get user attribute
          </button>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      )}
    </Authenticator>
  );
}
