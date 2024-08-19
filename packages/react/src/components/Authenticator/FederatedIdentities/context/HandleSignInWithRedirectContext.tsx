import React from 'react';
import { signInWithRedirect } from 'aws-amplify/auth';
import { SignInWithRedirectAction } from '../controls';

const HandleSignInWithRedirectContext =
  React.createContext<SignInWithRedirectAction>(signInWithRedirect);

export const HandleSignInWithRedirectProvider = ({
  children,
  customRedirect,
}: {
  children?: React.ReactNode;
  customRedirect: SignInWithRedirectAction;
}): JSX.Element => {
  return (
    <HandleSignInWithRedirectContext.Provider value={customRedirect}>
      {children}
    </HandleSignInWithRedirectContext.Provider>
  );
};

export const useHandleSignInWithRedirectContext =
  (): SignInWithRedirectAction => {
    return React.useContext(HandleSignInWithRedirectContext);
  };
