import { useActor } from '@xstate/react';
import { useContext } from 'react';

import { AuthenticatorContext } from '../components/Authenticator/AuthenticatorContext';

export function useAuthenticator() {
  return useActor(useContext(AuthenticatorContext));
}
