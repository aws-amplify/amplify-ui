import React from 'react';
import { signInWithRedirect } from 'aws-amplify/auth';
import { SignInWithRedirectAction } from '../controls';

const RedirectFunctionContext =
  React.createContext<SignInWithRedirectAction>(signInWithRedirect);

export const RedirectFunctionProvider = ({
  children,
  customRedirect,
}: {
  children?: React.ReactNode;
  customRedirect: SignInWithRedirectAction;
}): JSX.Element => {
  return (
    <RedirectFunctionContext.Provider value={customRedirect}>
      {children}
    </RedirectFunctionContext.Provider>
  );
};

export const useRedirectFunctionContext = (): SignInWithRedirectAction => {
  return React.useContext(RedirectFunctionContext);
};
