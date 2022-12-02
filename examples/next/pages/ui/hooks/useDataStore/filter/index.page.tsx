import { Amplify, DataStore } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import * as React from 'react';
import '@aws-amplify/ui-react/styles.css';

import { AuthSignOutButton } from '../AuthActions';
import awsExports from '../aws-exports';
import CollectionAndRecord from './CollectionAndRecord';
import { initializeTestData } from '../utils';

Amplify.configure({
  ...awsExports,
  aws_appsync_graphqlEndpoint: 'https://fake-appsync-endpoint/graphql',
});

export default function App() {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const initializeStarted = React.useRef(false);

  React.useEffect(() => {
    const initializeTestUserData = async () => {
      if (initializeStarted.current) {
        return;
      }
      await DataStore.clear();
      await initializeTestData();
      setIsInitialized(true);
    };

    initializeTestUserData();
    initializeStarted.current = true;
  }, []);

  if (!isInitialized) {
    return null;
  }

  return (
    <Authenticator>
      {({ user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <AuthSignOutButton>Sign out</AuthSignOutButton>
          <CollectionAndRecord />
        </main>
      )}
    </Authenticator>
  );
}
