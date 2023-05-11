import React from 'react';

import { AuthInterpreter, AuthStatus } from '@aws-amplify/ui';

/**
 * Authenticator React.Context type
 */
type AuthenticatorContextType = { service: AuthInterpreter };

/**
 * AuthenticatorContext serves static reference to the auth machine service.
 *
 * https://xstate.js.org/docs/recipes/react.html#context-provider
 */
export const AuthenticatorContext = React.createContext<
  (AuthenticatorContextType & { authStatus: AuthStatus }) | null
>(null);
