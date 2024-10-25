import React from 'react';
import { useRouter } from 'next/router';

import { SignIn } from './components';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

function Example() {
  const router = useRouter();

  return (
    <SignIn
      onSignIn={() => {
        router.push(`${router.pathname}/locations`);
      }}
    />
  );
}

export default Example;
