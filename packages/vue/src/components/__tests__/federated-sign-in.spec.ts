import { reactive, ref, Ref } from 'vue';
import { render, screen } from '@testing-library/vue';

import { components } from '../../../global-spec';
import * as UseAuthComposables from '../../composables/useAuth';
import FederatedSignIn from '../federated-sign-in.vue';

import {
  AuthInterpreter,
  AuthMachineState,
  AuthenticatorServiceFacade,
  SocialProvider,
  authenticatorTextUtil,
} from '@aws-amplify/ui';

const mockServiceFacade: AuthenticatorServiceFacade = {
  authStatus: 'authenticated',
  codeDeliveryDetails: {} as AuthenticatorServiceFacade['codeDeliveryDetails'],
  error: undefined as unknown as AuthenticatorServiceFacade['error'],
  hasValidationErrors: false,
  isPending: false,
  route: 'signIn',
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

const socialProviders: SocialProvider[] = [
  'amazon',
  'apple',
  'facebook',
  'google',
];

jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  send: jest.fn(),
  service: undefined as unknown as AuthInterpreter,
  state: ref(undefined) as unknown as Ref<AuthMachineState>,
});

const useAuthenticatorSpy = jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(mockServiceFacade));

describe('FederatedSignIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render anything if socialProviders are empty', () => {
    const { container } = render(FederatedSignIn, { global: { components } });
    expect(container.firstChild?.hasChildNodes()).toBe(false);
  });

  it.each(socialProviders)(
    'renders as expected with %s provider',
    async (socialProvider) => {
      useAuthenticatorSpy.mockReturnValueOnce({
        ...mockServiceFacade,
        socialProviders: [socialProvider],
      });

      const { container } = render(FederatedSignIn, { global: { components } });
      expect(container).toMatchSnapshot();

      const { getSignInWithFederationText } = authenticatorTextUtil;
      const socialSignInText = getSignInWithFederationText(
        'signIn',
        socialProvider
      );

      expect(await screen.findByText(socialSignInText)).toBeInTheDocument();
    }
  );
});
