import { reactive, ref, Ref } from 'vue';
import { render, screen } from '@testing-library/vue';

import { components } from '../../../global-spec';
import { baseMockServiceFacade } from '../../composables/__mock__/useAuthenticatorMock';
import * as UseAuthComposables from '../../composables/useAuth';
import FederatedSignIn from '../federated-sign-in.vue';

import {
  AuthInterpreter,
  AuthMachineState,
  SocialProvider,
  authenticatorTextUtil,
} from '@aws-amplify/ui';

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

const mockServiceFacade = { ...baseMockServiceFacade, route: 'signIn' };
const useAuthenticatorSpy = jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(mockServiceFacade));

describe('FederatedSignIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render anything if socialProviders does not exist', () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        socialProviders: undefined,
      })
    );

    const { container } = render(FederatedSignIn, { global: { components } });
    expect(container.firstChild?.hasChildNodes()).toBe(false);
  });

  it('does not render anything if socialProviders array is empty', () => {
    useAuthenticatorSpy.mockReturnValueOnce(
      reactive({
        ...mockServiceFacade,
        socialProviders: [],
      })
    );

    const { container } = render(FederatedSignIn, { global: { components } });
    expect(container.firstChild?.hasChildNodes()).toBe(false);
  });

  it.each(socialProviders)(
    'renders as expected with %s provider',
    async (socialProvider) => {
      useAuthenticatorSpy.mockReturnValueOnce(
        reactive({
          ...mockServiceFacade,
          socialProviders: [socialProvider],
        })
      );

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
