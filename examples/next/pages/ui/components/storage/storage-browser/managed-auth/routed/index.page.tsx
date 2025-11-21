import React from 'react';
import { useRouter } from 'next/router';

import { SignIn } from '../components';

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
