import React from 'react';
import { signInWithRedirect } from 'aws-amplify/auth';

const HandleSignInWithRedirectContext = React.createContext<
  typeof signInWithRedirect | undefined
>(undefined);

export const HandleSignInWithRedirectProvider = ({
  children,
  customRedirect,
}: {
  children?: React.ReactNode;
  customRedirect?: typeof signInWithRedirect;
}): JSX.Element => {
  return (
    <HandleSignInWithRedirectContext.Provider value={customRedirect}>
      {children}
    </HandleSignInWithRedirectContext.Provider>
  );
};

export const useHandleSignInWithRedirectContext =
  (): typeof signInWithRedirect => {
    const handleSignInWithRedirect = React.useContext(
      HandleSignInWithRedirectContext
    );

    if (!handleSignInWithRedirect) {
      return signInWithRedirect;
    }

    return handleSignInWithRedirect;
  };
