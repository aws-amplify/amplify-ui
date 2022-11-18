import { AuthenticatorService } from '../authenticator.service';

import * as UIModule from '@aws-amplify/ui';
import * as XState from 'xstate';
import { MockAuthService } from './mockAuthService';

const mockContextFacade = {
  authStatus: 'unauthenticated',
} as unknown as ReturnType<typeof UIModule['getServiceContextFacade']>;

const mockSendAliases = {
  toSignIn: jest.fn(),
} as unknown as ReturnType<typeof UIModule['getSendEventAliases']>;

jest
  .spyOn(UIModule, 'getServiceContextFacade')
  .mockReturnValue(mockContextFacade);
jest.spyOn(UIModule, 'getSendEventAliases').mockReturnValue(mockSendAliases);

// mock interpreted authservice
jest
  .spyOn(XState, 'interpret')
  .mockReturnValue(new MockAuthService() as unknown as XState.AnyInterpreter);

describe('AuthenticatorService', () => {
  let authService: AuthenticatorService;

  beforeEach(() => {
    authService = new AuthenticatorService();
    jest.clearAllMocks();
  });

  it('subscribes to state machine changes', () => {
    const handler = jest.fn();
    const unsubscribe = authService.subscribe(handler);

    // trigger a mock transition
    authService.send('INIT');

    expect(handler).toBeCalledTimes(1);

    const facade = handler.mock.calls[0][0];
    expect(facade).toMatchObject({ ...mockContextFacade, ...mockSendAliases });

    unsubscribe();
  });
});
