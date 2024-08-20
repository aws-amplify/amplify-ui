import React from 'react';
import {
  SignInWithRedirectProviderInput,
  UseHandleSignInWithRedirectOutput,
} from '../controls';
import { signInWithRedirect, SignInWithRedirectInput } from 'aws-amplify/auth';
import { useDataState } from '@aws-amplify/ui-react-core';

export const RedirectHookContext = React.createContext<
  UseHandleSignInWithRedirectOutput | undefined
>(undefined);

export function RedirectHookProvider({
  handleSignInWithRedirect = signInWithRedirect,
  children,
}: SignInWithRedirectProviderInput): JSX.Element {
  async function _signInWithRedirectAction(
    _: void | undefined,
    input: SignInWithRedirectInput
  ): Promise<void> {
    await handleSignInWithRedirect(input);
  }

  const useSignInWithRedirectDataState = useDataState(
    _signInWithRedirectAction,
    undefined
  );

  return (
    <RedirectHookContext.Provider value={useSignInWithRedirectDataState}>
      {children}
    </RedirectHookContext.Provider>
  );
}

export const useRedirectHook = (): UseHandleSignInWithRedirectOutput => {
  const useHandleSignInWithRedirect = React.useContext(RedirectHookContext);

  if (useHandleSignInWithRedirect === undefined) {
    throw new Error(
      'useHandleSignInWithRedirect must be used within a UseHandleSignInWithRedirectProvider'
    );
  }

  return useHandleSignInWithRedirect;
};
