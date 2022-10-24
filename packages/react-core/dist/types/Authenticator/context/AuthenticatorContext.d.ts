import React from 'react';
import { AuthInterpreter } from '@aws-amplify/ui';
/**
 * Authenticator React.Context type
 */
declare type AuthenticatorContextType = {
    service: AuthInterpreter;
};
/**
 * AuthenticatorContext serves static reference to the auth machine service.
 *
 * https://xstate.js.org/docs/recipes/react.html#context-provider
 */
export declare const AuthenticatorContext: React.Context<AuthenticatorContextType | null>;
export {};
