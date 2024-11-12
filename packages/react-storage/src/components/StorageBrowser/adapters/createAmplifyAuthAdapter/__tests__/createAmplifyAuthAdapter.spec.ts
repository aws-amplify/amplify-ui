import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import {
  createAmplifyAuthAdapter,
  MISSING_BUCKET_OR_REGION_ERROR,
  MISSING_IDENTITY_ID_ERROR,
  MISSING_TEMPORARY_CREDENTIALS_ERROR,
} from '../createAmplifyAuthAdapter';

const credentials = {
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey',
  sessionToken: 'sessionToken',
  expiration: new Date(Date.now() + 60 * 60_1000),
};
const mockFetchAuthSession = jest.fn(async (_: { forceRefresh?: boolean }) =>
  Promise.resolve({ credentials, identityId: 'identityId' })
);

jest.mock('aws-amplify/auth', () => ({
  fetchAuthSession: (input: { forceRefresh?: boolean }) =>
    mockFetchAuthSession(input),
}));

describe('createAmplifyAuthAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Amplify, 'getConfig').mockReturnValue({
      Storage: { S3: { bucket: 'XXXXXX', region: 'region' } },
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

  it('should throw if no bucket is returned from getConfig', () => {
    jest
      .spyOn(Amplify, 'getConfig')
      .mockReturnValue({ Storage: { S3: { region: 'region' } } });

    expect(createAmplifyAuthAdapter).toThrow(MISSING_BUCKET_OR_REGION_ERROR);
  });

  it('should throw if no region is returned from getConfig', () => {
    jest
      .spyOn(Amplify, 'getConfig')
      .mockReturnValue({ Storage: { S3: { bucket: 'bucket' } } });

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

    Hub.dispatch('auth', { event: 'signedOut' });

    expect(onStateChange).toHaveBeenCalled();
  });

  it('throws when getLocationCredentials is called and fetchAuthSession does not return temporary credentials', async () => {
    // @ts-expect-error intentionally return empty credentials
    mockFetchAuthSession.mockResolvedValueOnce({ credentials: {} });

    const { getLocationCredentials } = createAmplifyAuthAdapter();

    await expect(
      getLocationCredentials({
        permission: 'READWRITE',
        scope: 's3://bucket/prefix/*',
      })
    ).rejects.toThrow(MISSING_TEMPORARY_CREDENTIALS_ERROR);
  });

  it('throws when getLocationCredentials is called and fetchAuthSession does not return an identityId', async () => {
    // @ts-expect-error intentionally return missing identityId
    mockFetchAuthSession.mockResolvedValueOnce({ credentials });

    const { getLocationCredentials } = createAmplifyAuthAdapter();

    await expect(
      getLocationCredentials({
        permission: 'READWRITE',
        scope: 's3://bucket/prefix/*',
      })
    ).rejects.toThrow(MISSING_IDENTITY_ID_ERROR);
  });
});
