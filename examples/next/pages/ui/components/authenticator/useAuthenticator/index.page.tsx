import { Amplify } from 'aws-amplify';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const Home = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <h2>Welcome, {user.username}!</h2>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};

const Login = () => <Authenticator />;

function App() {
  const { route } = useAuthenticator((context) => [context.route]);
  return route === 'authenticated' ? <Home /> : <Login />;
}

export default function AppWithProvider() {
  return (
    <Authenticator.Provider>
      <App></App>
    </Authenticator.Provider>
  );
}
