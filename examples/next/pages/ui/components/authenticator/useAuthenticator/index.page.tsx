import router from 'next/router';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

import { Authenticator } from '@aws-amplify/ui-react';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

export default function App() {
  const navigateHome = () => router.push('useAuthenticator/home');

  return (
    <Authenticator>
      <button onClick={navigateHome}>Navigate to Home</button>
    </Authenticator>
  );
}
