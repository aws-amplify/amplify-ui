import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import amplifyOutputs from './amplify_outputs';
Amplify.configure(amplifyOutputs);

export default function App({ signOut }) {
  return (
    <Authenticator variation="modal">
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
