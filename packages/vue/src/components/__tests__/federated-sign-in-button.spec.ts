import { reactive } from 'vue';
import { screen, render, fireEvent } from '@testing-library/vue';

import { components } from '../../../global-spec';
import { baseMockServiceFacade } from '../../composables/__mock__/useAuthenticatorMock';
import * as UseAuthComposables from '../../composables/useAuth';
import FederatedSignInButton from '../federated-sign-in-button.vue';

const toFederatedSignInSpy = jest.fn();

const mockServiceFacade = {
  ...baseMockServiceFacade,
  toFederatedSignIn: toFederatedSignInSpy,
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
