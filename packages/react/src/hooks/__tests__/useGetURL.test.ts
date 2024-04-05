import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { getUrl, GetUrlInput } from 'aws-amplify/storage';

import { useGetURL } from '../useGetURL';

jest.mock('aws-amplify/storage');

type UseGetUrlInput = GetUrlInput & {
  onError?: (error: Error) => void;
};

describe('useGetURL', () => {
  afterEach(() => jest.clearAllMocks());

  const url = 'https://amplify.s3.amazonaws.com/path/to/the/file.jpg';

  const onStorageGetError = jest.fn();
  const onGetUrlError = jest.fn();

  const useGetURLKeyParams: UseGetUrlInput = {
    key: 'file.jpg',
    options: { accessLevel: 'guest' },
    onError: onStorageGetError,
  };
  const useGetURLPathParams: UseGetUrlInput = {
    path: 'guest/file.jpg',
    onError: onGetUrlError,
  };

  const paramType = [
    { useGetURLParams: useGetURLKeyParams, description: 'with key params' },
    { useGetURLParams: useGetURLPathParams, description: 'with path params' },
  ];

  it.each(paramType)(
    `should return true for isLoading at initialization $description`,
    async ({ useGetURLParams, description }) => {
      let result;
      (getUrl as jest.Mock).mockResolvedValue({ url });
      ({ result } = renderHook(() => useGetURL(useGetURLParams)));
      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });
    }
  );

  it.each(paramType)(
    'should return a Storage URL $description',
    async ({ useGetURLParams, description }) => {
      (getUrl as jest.Mock).mockResolvedValue({ url });

      const { onError, ...getUrlParams } = useGetURLParams;
      let result, waitForNextUpdate;

      ({ result, waitForNextUpdate } = renderHook(() =>
        useGetURL(useGetURLParams)
      ));

      expect(getUrl).toHaveBeenCalledWith(getUrlParams);
      expect(result.current.isLoading).toBe(true);

      // Next update will happen when getUrl resolves
      await waitForNextUpdate();

      expect(getUrl).toHaveBeenCalledTimes(1);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.url).toBe(url);
    }
  );

  it.each(paramType)(
    'should invoke onStorageGetError when getUrl fails $description',
    async ({ useGetURLParams, description }) => {
      const customError = new Error('Something went wrong');
      const { onError, ...getUrlParams } = useGetURLParams;
      (getUrl as jest.Mock).mockRejectedValue(customError);

      let waitForNextUpdate;
      ({ waitForNextUpdate } = renderHook(() => useGetURL(useGetURLParams)));

      expect(getUrl).toHaveBeenCalledWith(getUrlParams);

      // Next update will happen when getUrl resolves
      await waitForNextUpdate();
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(customError);
    }
  );
});
