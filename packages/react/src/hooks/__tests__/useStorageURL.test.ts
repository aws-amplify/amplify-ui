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

  it('should return undefined at initialization', async () => {
    (Storage.get as jest.Mock).mockResolvedValue(storageUrl);

    const { result, waitForNextUpdate } = renderHook(() =>
      useStorageURL(storageKey)
    );

    expect(result.current).toBeUndefined();

    // Force next render to prevent test warning
    await waitForNextUpdate();
  });

  it('should return a Storage URL', async () => {
    (Storage.get as jest.Mock).mockResolvedValue(storageUrl);

    const { result, waitForNextUpdate } = renderHook(() =>
      useStorageURL(storageKey, storageOptions)
    );

    await waitForNextUpdate();

    expect(result.current).toBe(storageUrl);
    expect(Storage.get).toHaveBeenCalledTimes(1);
    expect(Storage.get).toHaveBeenCalledWith(storageKey, storageOptions);
  });

  it('should invoke onStorageGetError and return a fallbackURL when Storage.get fails', async () => {
    const customError = new Error('Something wrong happen');

    (Storage.get as jest.Mock).mockRejectedValue(customError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useStorageURL(storageKey, storageOptions, errorConfig)
    );

    await waitForNextUpdate();

    expect(result.current).toBe(errorConfig.fallbackURL);
    expect(errorConfig.onStorageGetError).toHaveBeenCalledTimes(1);
    expect(errorConfig.onStorageGetError).toHaveBeenCalledWith(customError);
  });

  it('should execute Storage.cancel before rendering next update', async () => {
    (Storage.get as jest.Mock).mockResolvedValue(storageUrl);

    const { waitForNextUpdate } = renderHook(() => useStorageURL(storageKey));

    // Next update triggered when Storage.get resolves
    await waitForNextUpdate();

    // Storage.cancel was run as a cleanup function in useEffect before the next update
    expect(Storage.cancel).toHaveBeenCalled();
    expect(Storage.cancel).toHaveBeenCalledTimes(1);
  });
});
