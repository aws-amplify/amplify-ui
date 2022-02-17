import { Amplify, Hub } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { NavigateActions } from './NavigateActions';
import { AuthSignOutButton } from './AuthActions';

import awsExports from './aws-exports';
import { useEffect } from 'react';
import { DataStoreTodoForm } from './DataStoreActions';
Amplify.configure({
  ...awsExports,
  aws_appsync_graphqlEndpoint: 'https://fake-appsync-endpoint/graphql',
});

export default function App() {
  useEffect(() => {
    (window as any).LOG_LEVEL = 'DEBUG';
    Hub.listen('ui', (data) => {
      console.log(data);
    });
    Hub.listen('datastore', (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <NavigateActions />
      <Authenticator>
        {({ user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <AuthSignOutButton>Sign out</AuthSignOutButton>
            <DataStoreTodoForm />
          </main>
        )}
      </Authenticator>
    </div>
  );
}
