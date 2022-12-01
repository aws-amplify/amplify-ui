import { Amplify, DataStore, Hub } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import * as React from 'react';
import '@aws-amplify/ui-react/styles.css';

import { AuthSignOutButton } from '../AuthActions';
import awsExports from '../aws-exports';
import Collection from './Collection';
import { initializeTestData } from '../utils';

Amplify.configure({
  ...awsExports,
  aws_appsync_graphqlEndpoint: 'https://fake-appsync-endpoint/graphql',
});

export default function App() {
  const [isInitialized, setInitialized] = React.useState(false);
  const initializeStarted = React.useRef(false);

  React.useEffect(() => {
    (window as any).LOG_LEVEL = 'DEBUG';
    Hub.listen('ui', (data) => {
      console.log(data);
    });
    Hub.listen('datastore', (data) => {
      console.log(data);
    });
    const initializeTestUserData = async () => {
      if (initializeStarted.current) {
        return;
      }
      await DataStore.clear();
      await initializeTestData();
      setInitialized(true);
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
          <Collection id="collectionWithSort" />
        </main>
      )}
    </Authenticator>
  );
}
