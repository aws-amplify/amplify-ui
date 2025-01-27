import React from 'react';

import { Button, Flex } from '@aws-amplify/ui-react';

import { routedAuth } from './StorageBrowser';

export function SignIn({ onSignIn }: { onSignIn?: () => void }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  return (
    <Flex
      alignItems="center"
      direction="column"
      height="100vh"
      justifyContent="center"
    >
      <Button
        onClick={() => {
          setIsLoading(true);
          routedAuth.signIn({
            onSignIn: () => {
              setIsLoading(false);
              onSignIn?.();
            },
            onError: (e: Error) => {
              setErrorMessage(e.message);
              setIsLoading(false);
            },
          });
        }}
      >
        Sign In
      </Button>

      {isLoading ? <span>Authenticating...</span> : null}
      {errorMessage ? <span>{errorMessage}</span> : null}
    </Flex>
  );
}

export function SignOutButton({ onSignOut }: { onSignOut?: () => void }) {
  return (
    <Button
      size="small"
      marginBlockEnd="xl"
      onClick={() => {
        routedAuth.signOut({ onSignOut });
      }}
    >
      Sign Out
    </Button>
  );
}
