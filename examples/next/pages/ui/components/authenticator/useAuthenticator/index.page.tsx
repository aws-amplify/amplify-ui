import router from 'next/router';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsExports);

export default function App() {
  const navigateHome = () => router.push('useAuthenticator/home');

  return (
    <Authenticator>
      {() => <button onClick={navigateHome}>Navigate to Home</button>}
    </Authenticator>
  );
}
