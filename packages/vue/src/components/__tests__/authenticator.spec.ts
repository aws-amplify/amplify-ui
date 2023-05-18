import { reactive, Ref, ref } from 'vue';
import { render, screen } from '@testing-library/vue';

import {
  AuthenticatorServiceFacade,
  AuthEvent,
  AuthInterpreter,
  AuthMachineState,
} from '@aws-amplify/ui';

import { components } from '../../../global-spec';
import * as UseAuthComposables from '../../composables/useAuth';
import Authenticator from '../authenticator';

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');

const mockServiceFacade: AuthenticatorServiceFacade = {
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
    undefined as unknown as AuthenticatorServiceFacade['validationErrors'],
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

class MockAuthService {
  public listeners: ((state: AuthMachineState) => void)[] = [];

  subscribe(callback: (state: AuthMachineState) => void) {
    this.listeners.push(callback);
    const unsubscribe = jest.fn();
    return { unsubscribe };
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

const mockStateRef = ref(idleState) as unknown as Ref<AuthMachineState>;

const sendSpy = jest.fn();
const useAuthSpy = jest.spyOn(UseAuthComposables, 'useAuth').mockReturnValue({
  authStatus: ref('unauthenticated'),
  state: mockStateRef,
  send: sendSpy,
  service: mockService,
});
const useAuthenticatorSpy = jest
  .spyOn(UseAuthComposables, 'useAuthenticator')
  .mockReturnValue(reactive(mockServiceFacade));

describe('authenticator', () => {
  beforeEach(() => {
    mockService['listeners'] = [];
    useAuthSpy.mockClear();
    useAuthenticatorSpy.mockClear();
    sendSpy.mockClear();
  });

  it('initializes the machine as expected', () => {
    render(Authenticator, {
      global: {
        components,
      },
    });

    expect(mockService['listeners'].length === 1);
    const listener = mockService['listeners'][0];

    listener(setupState);

    expect(sendSpy).toBeCalledTimes(1);
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

  it('initializes with Authenticator props', () => {
    const props = {
      formFields: {},
      initialState: 'signIn',
      loginMechanisms: ['username'],
      services: {},
      signUpAttributes: ['phone_number'],
      socialProviders: ['facebook'],
    };
    render(Authenticator, {
      global: {
        components,
      },
      props,
    });

    const listener = mockService['listeners'][0];
    listener(setupState);

    expect(sendSpy).toBeCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith({
      type: 'INIT',
      data: props,
    });
  });

  it('renders default slot if route is authenticated', () => {
    useAuthenticatorSpy.mockReturnValue(
      reactive({
        ...mockServiceFacade,
        route: 'authenticated',
      })
    );

    const defaultContent = 'Default Slot';

    render(Authenticator, {
      global: {
        components,
      },
      slots: {
        default: defaultContent,
      },
    });

    expect(screen.getByText(defaultContent)).toBeInTheDocument();
  });
});
