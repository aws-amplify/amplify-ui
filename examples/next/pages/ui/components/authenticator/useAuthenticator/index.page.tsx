import { Amplify } from 'aws-amplify';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  const { route, user, signOut } = useAuthenticator();

  return route === 'authenticated' ? (
    <div className="App">
      <div>Hello, {user.username}</div>
      <button onClick={signOut}>Sign out</button>
    </div>
  ) : (
    <Authenticator></Authenticator>
  );
}
