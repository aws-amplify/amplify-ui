import { reactive, Ref, ref } from 'vue';
import { cleanup, render, screen } from '@testing-library/vue';

import * as UIModule from '@aws-amplify/ui';
import {
  AuthenticatorRoute,
  AuthEvent,
  AuthInterpreter,
  AuthMachineState,
  UnverifiedUserAttributes,
} from '@aws-amplify/ui';

import { components } from '../../../global-spec';
import { baseMockServiceFacade } from '../../composables/__mocks__/useAuthenticatorMock';
import * as UseAuthComposables from '../../composables/useAuth';
import Authenticator from '../authenticator';

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');

const routesWithComponent: AuthenticatorRoute[] = [
  'confirmResetPassword',
  'confirmSignIn',
  'confirmSignUp',
  'confirmVerifyUser',
  'forceNewPassword',
  'forgotPassword',
  'setupTotp',
  'signIn',
  'signUp',
  'verifyUser',
];

const unsubscribeSpy = jest.fn();

class MockAuthService {
  public listeners: ((state: AuthMachineState) => void)[] = [];

  subscribe(callback: (state: AuthMachineState) => void) {
    this.listeners.push(callback);
    return { unsubscribe: unsubscribeSpy };
  }

  start() {
    return this;
  }

  send(event: { type: string; data: Record<string, unknown> }) {
    sendSpy(event as unknown as AuthEvent);
  }
}

const mockService = new MockAuthService() as unknown as AuthInterpreter;

const idleState = {
  matches: (state: string) => state === 'setup',
} as unknown as AuthMachineState;

const setupState = {
  matches: (state: string) => state === 'setup',
} as unknown as AuthMachineState;

const unverifiedUserAttributes: UnverifiedUserAttributes = {
  email: 'test@example.com',
};

const mockStateRef = ref(idleState) as unknown as Ref<AuthMachineState>;

const sendSpy = jest.fn();
jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  state: mockStateRef,
  send: sendSpy,
  service: mockService,
});

const useAuthenticatorSpy = jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(baseMockServiceFacade));

jest.spyOn(UIModule, 'getSortedFormFields').mockReturnValue([]);

describe('authenticator', () => {
  beforeEach(() => {
    mockService['listeners'] = [];
    jest.clearAllMocks();
    sendSpy.mockClear();
  });

  it('initializes the machine as expected', () => {
    render(Authenticator, { global: { components } });

    expect(mockService['listeners'].length === 1);
    const listener = mockService['listeners'][0];

    listener(setupState);

    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith({
      type: 'INIT',
      data: {
        formFields: undefined,
        initialState: undefined,
        loginMechanisms: undefined,
        services: undefined,
        signUpAttributes: undefined,
        socialProviders: undefined,
      },
    });
  });

  it('initializes state machine with Authenticator props', () => {
    const props = {
      formFields: {},
      initialState: 'signIn',
      loginMechanisms: ['username'],
      services: {},
      signUpAttributes: ['phone_number'],
      socialProviders: ['facebook'],
    };
    render(Authenticator, { global: { components }, props });

    const listener = mockService['listeners'][0];
    listener(setupState);

    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith({
      type: 'INIT',
      data: props,
    });
  });

  it('initializes state machine with empty Authenticator props', () => {
    const props = {};
    render(Authenticator, { global: { components }, props });

    const listener = mockService['listeners'][0];
    listener(setupState);

    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith({
      type: 'INIT',
      data: props,
    });
  });

  it('unsubscribes hub after Authenticator unmounts', () => {
    render(Authenticator, { global: { components } });
    cleanup();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('renders default slot if route is authenticated', () => {
    useAuthenticatorSpy.mockReturnValue(
      reactive({
        ...baseMockServiceFacade,
        route: 'authenticated',
      })
    );

    const defaultContent = 'Default Slot';

    render(Authenticator, {
      global: { components },
      slots: { default: defaultContent },
    });

    expect(screen.getByText(defaultContent)).toBeInTheDocument();
  });

  it.each(routesWithComponent)('renders %s subcomponent', (route) => {
    let user = undefined;
    const challengeName = 'SOFTWARE_TOKEN_MFA';

    // some routes expect specific shape of user
    if (route === 'setupTotp') {
      user = { username: 'username' };
    }

    useAuthenticatorSpy.mockReturnValue(
      reactive({
        ...baseMockServiceFacade,
        challengeName,
        route,
        user,
        totpSecretCode:
          route === 'setupTotp' ? 'totp-mock-secret-code' : undefined,
        unverifiedUserAttributes,
      })
    );

    const { container } = render(Authenticator, { global: { components } });
    expect(container).toMatchSnapshot();
  });

  it('hides sign up tab if hideSignUp is true', async () => {
    useAuthenticatorSpy.mockReturnValue(
      reactive({
        ...baseMockServiceFacade,
        route: 'signIn',
      })
    );

    const props = { hideSignUp: true };
    render(Authenticator, { global: { components }, props });

    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });
});
