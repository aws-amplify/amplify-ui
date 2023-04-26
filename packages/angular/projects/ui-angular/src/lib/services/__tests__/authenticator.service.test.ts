import { AuthenticatorService } from '../authenticator.service';

import * as UIModule from '@aws-amplify/ui';
import * as XState from 'xstate';

// mock state machine service
// based on https://github.com/statelyai/xstate/blob/main/packages/core/src/interpreter.ts
export class MockAuthService {
  private listeners: (() => void)[] = [];

  subscribe(callback: () => void) {
    this.listeners.push(callback);
    const unsubscribe = () => {};
    return { unsubscribe };
  }

  start() {
    return this;
  }

  send() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

const mockFacade = {} as unknown as ReturnType<
  typeof UIModule['getServiceFacade']
>;

jest.spyOn(UIModule, 'getServiceFacade').mockReturnValue(mockFacade);
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

  it('subscribe returns state machine facade', () => {
    const handler = jest.fn();
    const { unsubscribe } = authService.subscribe(handler);

    // trigger a mock transition
    authService.send('INIT');

    expect(handler).toBeCalledTimes(1);

    const facade = handler.mock.calls[0][0];
    expect(facade).toEqual(mockFacade);

    unsubscribe();
  });
});
