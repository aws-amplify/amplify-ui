import { reactive } from 'vue';
import { screen, render, fireEvent } from '@testing-library/vue';

import { components } from '../../../global-spec';
import FederatedSignInButton from '../federated-sign-in-button.vue';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

import * as UseAuthComposables from '../../composables/useAuth';

const toFederatedSignInSpy = jest.fn();
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
  toFederatedSignIn: toFederatedSignInSpy,
  toResetPassword: jest.fn(),
  toSignIn: jest.fn(),
  toSignUp: jest.fn(),
  skipVerification: jest.fn(),
};

jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(mockServiceFacade));

describe('FederatedSignInButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    const signInText = 'Sign In with Amazon';

    const { container } = render(FederatedSignInButton, {
      global: { components },
      props: { provider: 'amazon' },
      slots: { default: signInText },
    });

    expect(container).toMatchSnapshot();
  });

  it('does not render anything if there is no provider', () => {
    const { container } = render(FederatedSignInButton, {
      global: { components },
    });

    expect(container.firstChild?.hasChildNodes()).toBe(false);
  });

  it('calls toFederatedSignIn on click', async () => {
    const signInText = 'Sign In with Amazon';
    render(FederatedSignInButton, {
      global: { components },
      props: { provider: 'amazon' },
      slots: { default: signInText },
    });

    const signInButton = await screen.findByRole('button', {
      name: signInText,
    });
    fireEvent.click(signInButton);

    expect(toFederatedSignInSpy).toHaveBeenCalledWith({
      provider: 'amazon',
    });
  });
});
