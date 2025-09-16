import { vi } from 'vitest';
import type { AuthenticatorServiceFacade } from '@aws-amplify/ui';

export const mockServiceFacade: AuthenticatorServiceFacade = {
  authStatus: 'unauthenticated',
  route: 'signIn',
  user: undefined,
  error: '',
  isPending: false,
  hasValidationErrors: false,
  validationErrors: {},
  submitForm: vi.fn(),
  updateForm: vi.fn(),
  toSignIn: vi.fn(),
  toSignUp: vi.fn(),
  toForgotPassword: vi.fn(),
  signOut: vi.fn(),
  resendCode: vi.fn(),
  initializeMachine: vi.fn(),
  updateBlur: vi.fn(),
  toFederatedSignIn: vi.fn(),
  skipVerification: vi.fn(),
  username: '',
  challengeName: undefined,
  totpSecretCode: null,
  socialProviders: [],
  unverifiedUserAttributes: {},
  codeDeliveryDetails: {},
  allowedMfaTypes: undefined,
};

export function createMockAuthenticatorStore(overrides?: Partial<AuthenticatorServiceFacade>) {
  return {
    ...mockServiceFacade,
    ...overrides,
    QRFields: null,
  };
}