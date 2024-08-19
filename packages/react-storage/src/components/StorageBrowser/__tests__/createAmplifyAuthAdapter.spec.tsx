import { act } from 'react-test-renderer';
import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import {
  createAmplifyAuthAdapter,
  MISSING_BUCKET_OR_REGION_ERROR,
} from '../adapters/createAmplifyAuthAdapter';

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

    expect(createAmplifyAuthAdapter).toThrow(MISSING_BUCKET_OR_REGION_ERROR);
  });

  it('should set Hub listener when registerAuthListener is called', () => {
    const hubListenSpy = jest.spyOn(Hub, 'listen');

    const authAdapter = createAmplifyAuthAdapter();
    const onStateChange = () => {
      /* clear location store */
    };
    authAdapter.registerAuthListener(onStateChange);
    expect(hubListenSpy).toHaveBeenCalled();
  });

  it('should call onStateChange if Hub signedOut event is called', () => {
    const authAdapter = createAmplifyAuthAdapter();
    const onStateChange = jest.fn();
    authAdapter.registerAuthListener(onStateChange);
    act(() => {
      Hub.dispatch('auth', { event: 'signedOut' });
    });
    expect(onStateChange).toHaveBeenCalled();
  });
});
