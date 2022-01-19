import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  useAuthenticatorUser,
  useAuthenticatorRoute,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const Home = () => {
  const { signOut, user } = useAuthenticatorUser();

  return (
    <>
      <h2>Welcome, {user.username}!</h2>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};

const Login = () => <Authenticator />;

function App() {
  const { route } = useAuthenticatorRoute();

  return route === 'authenticated' ? <Home /> : <Login />;
}

export default function AppWithProvider() {
  return (
    <Authenticator.Provider>
      <App></App>
    </Authenticator.Provider>
  );
}
