import React from 'react';
import { signInWithRedirect } from 'aws-amplify/auth';

const HandleSignInWithRedirectContext = React.createContext<
  typeof signInWithRedirect | undefined
>(undefined);

export const useHandleSignInWithRedirectContext =
  (): typeof signInWithRedirect => {
    const context = React.useContext(HandleSignInWithRedirectContext);

    if (!context) {
      return signInWithRedirect;
    }

    return context;
  };

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
