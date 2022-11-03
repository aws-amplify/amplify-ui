export { default as Authenticator } from './Authenticator';
export { AuthenticatorProps } from './types';

export {
  default as withAuthenticator,
  WithAuthenticatorOptions,
} from './withAuthenticator';

// re-export shared `Authenticator` exports
export { useAuthenticator, UseAuthenticator } from '@aws-amplify/ui-react-core';
