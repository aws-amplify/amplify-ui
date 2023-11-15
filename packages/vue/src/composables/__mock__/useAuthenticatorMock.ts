import { AuthenticatorServiceFacade } from '@aws-amplify/ui';
import { UseAuthenticator } from '../../types';

export const baseMockServiceFacade: UseAuthenticator = {
  authStatus: 'authenticated',
  challengeName: 'SELECT_MFA_TYPE',
  codeDeliveryDetails: {} as AuthenticatorServiceFacade['codeDeliveryDetails'],
  error: undefined as unknown as AuthenticatorServiceFacade['error'],
  hasValidationErrors: false,
  initializeMachine: jest.fn(),
  isPending: false,
  QRFields: null,
  resendCode: jest.fn(),
  route: 'idle',
  signOut: jest.fn(),
  skipVerification: jest.fn(),
  socialProviders: [],
  submitForm: jest.fn(),
  toFederatedSignIn: jest.fn(),
  toForgotPassword: jest.fn(),
  toSignIn: jest.fn(),
  toSignUp: jest.fn(),
  totpSecretCode: null,
  unverifiedUserAttributes: { email: 'test#example.com' },
  updateBlur: jest.fn(),
  updateForm: jest.fn(),
  user: {} as AuthenticatorServiceFacade['user'],
  username: 'tobias',
  validationErrors:
    {} as unknown as AuthenticatorServiceFacade['validationErrors'],
};
