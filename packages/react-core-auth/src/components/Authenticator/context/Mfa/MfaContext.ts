import { createContextUtilities } from '@aws-amplify/ui-react-core';

export interface MfaContextType {
  totpIssuer?: string;
  totpUsername?: string;
}

export const { MfaProvider, useMfa } = createContextUtilities<MfaContextType>({
  contextName: 'Mfa',
  errorMessage: '`useMfa` must be called inside a `MfaProvider`',
});
