import { renderHook } from '@testing-library/react-hooks';
import { useStorageURL } from '../useStorageURL';
import { S3ProviderGetConfig, Storage } from '@aws-amplify/storage';

jest.mock('@aws-amplify/storage');

describe('useStorageURL', () => {
  afterEach(() => jest.clearAllMocks());

  const key = 'file.jpg';
  const options: S3ProviderGetConfig = { level: 'public' };
  const url = 'https://amplify.s3.amazonaws.com/path/to/the/file.jpg';
  const fallbackURL =
    'https://amplify.s3.amazonaws.com/path/to/the/fallback.jpg';
  const onStorageGetError = jest.fn();
  const useStorageURLParams = {
    key,
    options,
    fallbackURL,
    onStorageGetError,
  };

  it('should return a Storage URL', async () => {
    (Storage.get as jest.Mock).mockResolvedValue(url);

    const { result, waitForNextUpdate } = renderHook(() =>
      useStorageURL(useStorageURLParams)
    );

    // should return undefined at initialization
    expect(result.current).toBeUndefined();

    expect(Storage.get).toHaveBeenCalledWith(key, options);

    // Next update will happen when Storage.get resolves
    await waitForNextUpdate();

    expect(result.current).toBe(url);
    expect(Storage.get).toHaveBeenCalledTimes(1);
  });

  it('should invoke onStorageGetError and return a fallbackURL when Storage.get fails', async () => {
    const customError = new Error('Something wrong happen');

    (Storage.get as jest.Mock).mockRejectedValue(customError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useStorageURL(useStorageURLParams)
    );

    expect(Storage.get).toHaveBeenCalledWith(key, options);

    // Next update will happen when Storage.get resolves
    await waitForNextUpdate();

    expect(result.current).toBe(fallbackURL);
    expect(onStorageGetError).toHaveBeenCalledTimes(1);
    expect(onStorageGetError).toHaveBeenCalledWith(customError);
  });

  it('should execute Storage.cancel before rerendering', async () => {
    (Storage.get as jest.Mock).mockResolvedValue(url);

    const { waitForNextUpdate } = renderHook(() =>
      useStorageURL(useStorageURLParams)
    );

    expect(Storage.get).toHaveBeenCalledWith(key, options);

    // Next update will happen when Storage.get resolves
    await waitForNextUpdate();

    // Since a rerender has happened, Storage.cancel should be run once at this point as a useEffect cleanup function
    expect(Storage.cancel).toHaveBeenCalled();
    expect(Storage.cancel).toHaveBeenCalledTimes(1);
  });
});
