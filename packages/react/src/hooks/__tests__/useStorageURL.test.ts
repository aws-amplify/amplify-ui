import { act, renderHook } from '@testing-library/react-hooks';
import { useStorageURL } from '../useStorageURL';
import { S3ProviderGetConfig, Storage } from '@aws-amplify/storage';

jest.mock('@aws-amplify/storage');

describe('useStorageURL', () => {
  afterEach(() => jest.clearAllMocks());

  const storageKey = 'file.jpg';
  const storageOptions: S3ProviderGetConfig = { level: 'public' };
  const storageUrl = 'https://amplify.s3.amazonaws.com/path/to/the/file.jpg';

  it('should return expected values at initialization', async () => {
    (Storage.get as jest.Mock).mockResolvedValue(undefined);

    const { result, waitForNextUpdate } = renderHook(() =>
      useStorageURL(storageKey)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.url).toBeUndefined();

    // Force next render to prevent test warning
    await waitForNextUpdate();
  });

  it('should return a Storage URL', async () => {
    (Storage.get as jest.Mock).mockResolvedValue(storageUrl);

    const { result, waitForNextUpdate } = renderHook(() =>
      useStorageURL(storageKey)
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.url).toBe(storageUrl);
  });

  it('should invoke Storage.get on fetch', async () => {
    const mockStorageGet = jest.fn(() => Promise.resolve());

    (Storage.get as jest.Mock).mockImplementation(mockStorageGet);

    const { waitForNextUpdate } = renderHook(() =>
      useStorageURL(storageKey, storageOptions)
    );

    await waitForNextUpdate();

    expect(mockStorageGet).toHaveBeenCalledWith(storageKey, storageOptions);
  });

  it('should set an error when Storage.get fails', async () => {
    const customError = new Error('Something wrong happen');

    (Storage.get as jest.Mock).mockRejectedValue(customError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useStorageURL(storageKey)
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.url).toBeUndefined();
  });

  it('should cancel Storage.get request on unmount', async () => {
    const mockStorageCancel = jest.fn();

    (Storage.get as jest.Mock).mockResolvedValue(undefined);
    (Storage.cancel as jest.Mock).mockImplementation(mockStorageCancel);

    const { waitForNextUpdate, unmount } = renderHook(() =>
      useStorageURL(storageKey)
    );

    // Start Storage fetch
    await waitForNextUpdate();

    // Unmount!
    act(() => unmount());

    expect(mockStorageCancel).toHaveBeenCalled();
  });
});
