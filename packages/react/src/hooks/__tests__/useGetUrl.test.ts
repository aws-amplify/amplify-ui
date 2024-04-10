import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { getUrl } from 'aws-amplify/storage';

import { useGetUrl, UseGetUrlInput } from '../useGetUrl';

jest.mock('aws-amplify/storage');

describe('useGetUrl', () => {
  afterEach(() => jest.clearAllMocks());

  const url = 'https://amplify.s3.amazonaws.com/path/to/the/file.jpg';

  const onStorageGetError = jest.fn();
  const onGetUrlError = jest.fn();

  const useGetUrlKeyParams: UseGetUrlInput = {
    key: 'file.jpg',
    options: { accessLevel: 'guest' },
    onError: onStorageGetError,
  };
  const useGetUrlPathParams: UseGetUrlInput = {
    path: 'guest/file.jpg',
    onError: onGetUrlError,
  };

  const paramType = [
    {
      useGetUrlParams: useGetUrlKeyParams,
      description: 'with key params',
      errorHandler: 'onStorageGetError',
    },
    {
      useGetUrlParams: useGetUrlPathParams,
      description: 'with path params',
      errorHandler: 'onGetUrlError',
    },
  ];

  it.each(paramType)(
    `should return true for isLoading at initialization $description`,
    async ({ useGetUrlParams, description }) => {
      let result;
      (getUrl as jest.Mock).mockResolvedValue({ url });
      ({ result } = renderHook(() => useGetUrl(useGetUrlParams)));
      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });
    }
  );

  it.each(paramType)(
    'should return a Storage URL $description',
    async ({ useGetUrlParams, description }) => {
      (getUrl as jest.Mock).mockResolvedValue({ url });

      const { onError, ...getUrlParams } = useGetUrlParams;
      let result, waitForNextUpdate;

      ({ result, waitForNextUpdate } = renderHook(() =>
        useGetUrl(useGetUrlParams)
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
    'should invoke $errorHandler when getUrl fails $description',
    async ({ useGetUrlParams, description, errorHandler }) => {
      const customError = new Error('Something went wrong');
      const { onError, ...getUrlParams } = useGetUrlParams;
      (getUrl as jest.Mock).mockRejectedValue(customError);

      let waitForNextUpdate;
      ({ waitForNextUpdate } = renderHook(() => useGetUrl(useGetUrlParams)));

      expect(getUrl).toHaveBeenCalledWith(getUrlParams);

      // Next update will happen when getUrl resolves
      await waitForNextUpdate();
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(customError);
    }
  );
});
