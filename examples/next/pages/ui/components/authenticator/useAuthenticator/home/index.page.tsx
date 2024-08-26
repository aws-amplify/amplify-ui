import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import * as React from 'react';
import router from 'next/router';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

function App() {
  const { user, signOut } = useAuthenticator();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut();
    router.push('../useAuthenticator');
  };

  return (
    <>
      <div>Hello, {user?.username}!</div>
      <button onClick={handleClick}>Sign Out</button>
    </>
  );
}

export default function ProviderWrappedApp() {
  return (
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  );
}
