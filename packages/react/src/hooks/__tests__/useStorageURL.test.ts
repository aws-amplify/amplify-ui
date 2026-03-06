import { renderHook, waitFor } from '@testing-library/react';
import { getUrl, GetUrlInput } from 'aws-amplify/storage';

import { useStorageURL } from '../useStorageURL';

jest.mock('aws-amplify/storage');

const key = 'file.jpg';
const options: GetUrlInput['options'] = { accessLevel: 'guest' };
const url = 'https://amplify.s3.amazonaws.com/path/to/the/file.jpg';
const fallbackURL = 'https://amplify.s3.amazonaws.com/path/to/the/fallback.jpg';
const onStorageGetError = jest.fn();
const useStorageURLParams = {
  key,
  options,
  fallbackURL,
  onStorageGetError,
};

describe('useStorageURL', () => {
  afterEach(jest.clearAllMocks);

  it('should return a Storage URL', async () => {
    (getUrl as jest.Mock).mockResolvedValue({ url });

    const { result } = renderHook(() => useStorageURL(useStorageURLParams));

    // should return undefined at initialization
    expect(result.current).toBeUndefined();

    expect(getUrl).toHaveBeenCalledWith({ key, options });

    // Next update will happen when Storage.get resolves
    await waitFor(() => {
      expect(result.current).toBe(url);
      expect(getUrl).toHaveBeenCalledTimes(1);
    });
  });

  it('should invoke onStorageGetError and return a fallbackURL when Storage.get fails', async () => {
    const customError = new Error('Something wrong happen');

    (getUrl as jest.Mock).mockRejectedValue(customError);

    const { result } = renderHook(() => useStorageURL(useStorageURLParams));

    expect(getUrl).toHaveBeenCalledWith({ key, options });

    // Next update will happen when Storage.get resolves
    await waitFor(() => {
      expect(result.current).toBe(fallbackURL);
      expect(onStorageGetError).toHaveBeenCalledTimes(1);
      expect(onStorageGetError).toHaveBeenCalledWith(customError);
    });
  });
});
