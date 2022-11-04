export { default as Authenticator } from './Authenticator';
export { AuthenticatorProps, WithAuthenticatorOptions } from './types';
export { default as withAuthenticator } from './withAuthenticator';

// re-export shared `Authenticator` exports
export { useAuthenticator, UseAuthenticator } from '@aws-amplify/ui-react-core';
