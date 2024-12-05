import React from 'react';
import { useRouter } from 'next/router';

import useIsSignedIn from './useIsSignedIn';

import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react-storage/styles.css';

function Example() {
  const router = useRouter();

  useIsSignedIn({
    onSignIn: () => {
      router.push(`${router.pathname}/locations`);
    },
  });

  return <Authenticator />;
}

export default Example;
