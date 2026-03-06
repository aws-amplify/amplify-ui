import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function App({ signOut }) {
  return (
    <Authenticator variation="modal">
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
