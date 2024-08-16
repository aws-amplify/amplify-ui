import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import { createAmplifyAuthAdapter } from '../adapters';
import { act } from 'react-test-renderer';

describe('createAmplifyAuthAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Amplify, 'getConfig').mockReturnValue({
      Storage: {
        S3: {
          bucket: 'XXXXXX',
          region: 'region',
        },
      },
    });
  });
  it('should create an auth adapter with the correct properties', () => {
    const authAdapter = createAmplifyAuthAdapter();

    expect(authAdapter).toHaveProperty('getLocationCredentials');
    expect(authAdapter).toHaveProperty('listLocations');
    expect(authAdapter).toHaveProperty('region');
    expect(authAdapter.region).toEqual('region');
    expect(authAdapter).toHaveProperty('registerAuthListener');
  });

  it('should throw if no bucket or region given', () => {
    jest.spyOn(Amplify, 'getConfig').mockReturnValue({});

    expect(createAmplifyAuthAdapter).toThrow(
      'Amplify Storage configuration not found. Did you run `Amplify.configure` from your project root?'
    );
  });

  it('should set Hub listener when registerAuthListener is called', () => {
    const hubListenSpy = jest.spyOn(Hub, 'listen');

    const authAdapter = createAmplifyAuthAdapter();
    const onStageChange = () => {
      /* clear location store */
    };
    authAdapter.registerAuthListener(onStageChange);
    expect(hubListenSpy).toHaveBeenCalled();
  });

  it('should call onStateChange if Hub signedOut event is called', () => {
    const authAdapter = createAmplifyAuthAdapter();
    const onStageChange = jest.fn();
    authAdapter.registerAuthListener(onStageChange);
    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });
    expect(onStageChange).toHaveBeenCalled();
  });
});
