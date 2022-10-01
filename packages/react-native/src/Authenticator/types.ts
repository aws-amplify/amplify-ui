import {
  AuthenticatorComponentDefaults,
  AuthenticatorComponentOverrides,
} from '@aws-amplify/ui-react-core';

import { FormHandlers } from './components';

export type ComponentDefaults = AuthenticatorComponentDefaults<FormHandlers>;

/**
 * Custom Authenticator components
 */
export type AuthenticatorComponents =
  AuthenticatorComponentOverrides<FormHandlers>;

export interface AuthenticatorProps {
  components?: AuthenticatorComponents;
}
