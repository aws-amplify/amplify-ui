import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

export const baseMockServiceFacade: AuthenticatorServiceFacade = {
  authStatus: 'authenticated',
  codeDeliveryDetails: {} as AuthenticatorServiceFacade['codeDeliveryDetails'],
  error: undefined as unknown as AuthenticatorServiceFacade['error'],
  hasValidationErrors: false,
  isPending: false,
  route: 'idle',
  socialProviders: [],
  unverifiedContactMethods: { email: 'test#example.com' },
  user: {} as AuthenticatorServiceFacade['user'],
  validationErrors:
    {} as unknown as AuthenticatorServiceFacade['validationErrors'],
  totpSecretCode: null,
  initializeMachine: jest.fn(),
  resendCode: jest.fn(),
  signOut: jest.fn(),
  submitForm: jest.fn(),
  updateForm: jest.fn(),
  updateBlur: jest.fn(),
  toFederatedSignIn: jest.fn(),
  toResetPassword: jest.fn(),
  toSignIn: jest.fn(),
  toSignUp: jest.fn(),
  skipVerification: jest.fn(),
};
