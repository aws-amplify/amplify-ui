import { Hub } from 'aws-amplify/utils';
import {
  defaultAuthHubHandler,
  listenToAuthHub,
} from '../defaultAuthHubHandler';
import { AuthInterpreter } from '../types';

const onSignIn = jest.fn();
const onSignOut = jest.fn();
const service = { send: jest.fn() } as unknown as AuthInterpreter;

describe('defaultAuthHubHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each(['tokenRefresh_failure', 'signedOut'])(
    'handles a %s event as expected',
    (event) => {
      defaultAuthHubHandler({ channel: 'auth', payload: { event } }, service);
      expect(service.send).toHaveBeenCalledTimes(1);
      expect(service.send).toHaveBeenCalledWith('SIGN_OUT');
    }
  );

  it('handles a signInWithRedirect event as expected', () => {
    defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'signInWithRedirect' } },
      service
    );
    expect(service.send).toHaveBeenCalledTimes(1);
    expect(service.send).toHaveBeenCalledWith('SIGN_IN_WITH_REDIRECT');
  });

  it('calls onSignOut callabck on signedOut event if provided', () => {
    defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'signedOut' } },
      service,
      { onSignOut }
    );
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });

  it('does not call onSignOut callback on tokenRefreh_failure event if provided', () => {
    defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'tokenRefreh_failure' } },
      service,
      { onSignOut }
    );
    expect(onSignOut).not.toHaveBeenCalled();
  });

  it('calls onSignIn callabck on signedIn event if provided', () => {
    defaultAuthHubHandler(
      { channel: 'auth', payload: { event: 'signedIn' } },
      service,
      { onSignIn }
    );
    expect(onSignIn).toHaveBeenCalledTimes(1);
  });
});

describe('listenToAuthHub', () => {
  it('creates a Hub listener', () => {
    // add empty mockImplementation to prevent logging "auth channel" warning output to the console
    jest.spyOn(console, 'warn').mockImplementation();

    const hubListenSpy = jest.spyOn(Hub, 'listen');
    const handler = jest.fn();

    listenToAuthHub(service, handler);

    expect(hubListenSpy).toHaveBeenCalledTimes(1);
    expect(hubListenSpy).toHaveBeenCalledWith(
      'auth',
      expect.any(Function),
      'authenticator-hub-handler'
    );

    Hub.dispatch('auth', { event: 'signedIn' }, 'authenticator-hub-handler');

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(
      {
        channel: 'auth',
        patternInfo: [],
        payload: { event: 'signedIn' },
        source: 'authenticator-hub-handler',
      },
      { send: expect.any(Function) }
    );
  });
});
