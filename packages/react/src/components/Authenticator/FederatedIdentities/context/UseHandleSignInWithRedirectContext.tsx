import React from 'react';
import {
  SignInWithRedirectProviderInput,
  UseHandleSignInWithRedirectOutput,
} from '../controls';
import { signInWithRedirect, SignInWithRedirectInput } from 'aws-amplify/auth';
import { useDataState } from '@aws-amplify/ui-react-core';

export const UseHandleSignInWithRedirectContext = React.createContext<
  UseHandleSignInWithRedirectOutput | undefined
>(undefined);

export function UseHandleSignInWithRedirectProvider({
  handleSignInWithRedirect = signInWithRedirect,
  children,
}: SignInWithRedirectProviderInput): JSX.Element {
  async function _signInWithRedirectAction(
    _: void | undefined,
    input: SignInWithRedirectInput
  ): Promise<void> {
    await handleSignInWithRedirect(input);
  }

  return (
    <UseHandleSignInWithRedirectContext.Provider
      value={useDataState(_signInWithRedirectAction, undefined)}
    >
      {children}
    </UseHandleSignInWithRedirectContext.Provider>
  );
}

export const useHandleSignInWithRedirect =
  (): UseHandleSignInWithRedirectOutput => {
    const useHandleSignInWithRedirect = React.useContext(
      UseHandleSignInWithRedirectContext
    );

    if (useHandleSignInWithRedirect === undefined) {
      throw new Error(
        'useHandleSignInWithRedirect must be used within a UseHandleSignInWithRedirectProvider'
      );
    }

    return useHandleSignInWithRedirect;
  };
