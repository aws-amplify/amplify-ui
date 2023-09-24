import React from 'react';
import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
// @todo-migration zero config workaround
import { getAuthenticatorConfig } from '@aws-amplify/ui';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const authenticatorConfig = getAuthenticatorConfig(awsExports);

export default function App() {
  return (
    <Authenticator {...authenticatorConfig}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
