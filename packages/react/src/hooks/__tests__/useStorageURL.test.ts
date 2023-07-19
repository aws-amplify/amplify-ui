import { renderHook } from '@testing-library/react-hooks';
import { useStorageURL } from '../useStorageURL';
import { S3ProviderGetConfig, Storage } from '@aws-amplify/storage';

jest.mock('@aws-amplify/storage');

describe('useStorageURL', () => {
  afterEach(() => jest.clearAllMocks());

  const storageKey = 'file.jpg';
  const storageOptions: S3ProviderGetConfig = { level: 'public' };
  const storageUrl = 'https://amplify.s3.amazonaws.com/path/to/the/file.jpg';
  const errorConfig = {
    fallbackURL: 'https://amplify.s3.amazonaws.com/path/to/the/fallback.jpg',
    onStorageGetError: jest.fn(),
  };

  it('should return a Storage URL', async () => {
    (Storage.get as jest.Mock).mockResolvedValue(storageUrl);

    const { result, waitForNextUpdate } = renderHook(() =>
      useStorageURL(storageKey, storageOptions)
    );

    // should return undefined at initialization
    expect(result.current).toBeUndefined();

    expect(Storage.get).toHaveBeenCalledWith(storageKey, storageOptions);

    // Next update will happen when Storage.get resolves
    await waitForNextUpdate();

    expect(result.current).toBe(storageUrl);
    expect(Storage.get).toHaveBeenCalledTimes(1);
  });

  it('should invoke onStorageGetError and return a fallbackURL when Storage.get fails', async () => {
    const customError = new Error('Something wrong happen');

    (Storage.get as jest.Mock).mockRejectedValue(customError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useStorageURL(storageKey, storageOptions, errorConfig)
    );

    expect(Storage.get).toHaveBeenCalledWith(storageKey, storageOptions);

    // Next update will happen when Storage.get resolves
    await waitForNextUpdate();

    expect(result.current).toBe(errorConfig.fallbackURL);
    expect(errorConfig.onStorageGetError).toHaveBeenCalledTimes(1);
    expect(errorConfig.onStorageGetError).toHaveBeenCalledWith(customError);
  });

  it('should execute Storage.cancel before rerendering', async () => {
    (Storage.get as jest.Mock).mockResolvedValue(storageUrl);

    const { waitForNextUpdate } = renderHook(() =>
      useStorageURL(storageKey, storageOptions)
    );

    expect(Storage.get).toHaveBeenCalledWith(storageKey, storageOptions);

    // Next update will happen when Storage.get resolves
    await waitForNextUpdate();

    // Since a rerender has happened, Storage.cancel should be run once at this point as a useEffect cleanup function
    expect(Storage.cancel).toHaveBeenCalled();
    expect(Storage.cancel).toHaveBeenCalledTimes(1);
  });
});
