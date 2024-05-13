import router from 'next/router';

import React from 'react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

import amplifyOutputs from './amplify_outputs';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(amplifyOutputs);

export default function App() {
  const navigateHome = () => router.push('useAuthenticator/home');

  return (
    <Authenticator>
      <button onClick={navigateHome}>Navigate to Home</button>
    </Authenticator>
  );
}
