import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { getUrl } from 'aws-amplify/storage';

import { useGetUrl, UseGetUrlInput } from '../useGetUrl';

jest.mock('aws-amplify/storage');

describe('useGetUrl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const url = 'https://amplify.s3.amazonaws.com/path/to/the/file.jpg';

  const onStorageGetError = jest.fn();
  const onGetUrlError = jest.fn();

  const KEY_INPUT: UseGetUrlInput = {
    key: 'file.jpg',
    options: { accessLevel: 'guest' },
    onError: onStorageGetError,
  };

  const PATH_INPUT: UseGetUrlInput = {
    path: 'guest/file.jpg',
    onError: onGetUrlError,
  };

  const paramType = [
    {
      useGetUrlParams: KEY_INPUT,
      description: 'with key params',
      errorHandler: 'onStorageGetError',
    },
    {
      useGetUrlParams: PATH_INPUT,
      description: 'with path params',
      errorHandler: 'onGetUrlError',
    },
  ];

  it.each(paramType)(
    `should return true for isLoading at initialization $description`,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ useGetUrlParams, description }) => {
      (getUrl as jest.Mock).mockResolvedValue({ url });
      const { result } = renderHook(() => useGetUrl(useGetUrlParams));
      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
        expect(result.current.url).toBe(undefined);
      });
    }
  );

  it.each(paramType)(
    'should return a Storage URL $description',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ useGetUrlParams, description }) => {
      (getUrl as jest.Mock).mockResolvedValue({ url });

      const { onError, ...getUrlParams } = useGetUrlParams;

      const { result, waitForNextUpdate } = renderHook(() =>
        useGetUrl(useGetUrlParams)
      );

      expect(getUrl).toHaveBeenCalledWith(getUrlParams);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.url).toBe(undefined);

      // Next update will happen when getUrl resolves
      await waitForNextUpdate();

      expect(getUrl).toHaveBeenCalledTimes(1);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.url).toBe(url);
    }
  );

  it.each(paramType)(
    'should invoke $errorHandler when getUrl fails $description',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ useGetUrlParams, description, errorHandler }) => {
      const customError = new Error('Something went wrong');
      const { onError, ...getUrlParams } = useGetUrlParams;
      (getUrl as jest.Mock).mockRejectedValue(customError);

      const { result, waitForNextUpdate } = renderHook(() =>
        useGetUrl(useGetUrlParams)
      );

      expect(getUrl).toHaveBeenCalledWith(getUrlParams);

      // Next update will happen when getUrl resolves
      await waitForNextUpdate();

      expect(result.current.isLoading).toBe(false);
      expect(result.current.url).toBe(undefined);
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(customError);
    }
  );

  it('ignores the first response if rerun a second time before the first call resolves in the happy path', async () => {
    const secondUrl =
      'https://amplify.s3.amazonaws.com/path/to/the/second-file.jpg';

    (getUrl as jest.Mock)
      .mockResolvedValueOnce({ url })
      .mockResolvedValueOnce({ url: secondUrl });

    const { onError, ...getUrlParams } = KEY_INPUT;

    const { result, waitForNextUpdate, rerender } = renderHook(
      (input: UseGetUrlInput = KEY_INPUT) => useGetUrl(input)
    );

    expect(getUrl).toHaveBeenCalledWith(getUrlParams);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.url).toBe(undefined);

    rerender({ ...KEY_INPUT, key: 'second-file.jpg' });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.url).toBe(undefined);

    // Next update will happen when getUrl resolves
    await waitForNextUpdate();

    expect(getUrl).toHaveBeenCalledWith({
      ...getUrlParams,
      key: 'second-file.jpg',
    });

    expect(getUrl).toHaveBeenCalledTimes(2);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.url).toBe(secondUrl);
  });

  it('ignores the first response if rerun a second time before the first call resolves in the unhappy path', async () => {
    const firstError = new Error('Something went wrong');
    const secondError = new Error('Something went wrong again');

    const { onError } = PATH_INPUT;
    (getUrl as jest.Mock)
      .mockRejectedValueOnce(firstError)
      .mockRejectedValueOnce(secondError);

    const { result, waitForNextUpdate, rerender } = renderHook(
      (input: UseGetUrlInput = PATH_INPUT) => useGetUrl(input)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.url).toBe(undefined);
    expect(onError).toHaveBeenCalledTimes(0);

    rerender({ ...PATH_INPUT, path: 'guest/second-file.jpg' });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.url).toBe(undefined);
    expect(onError).toHaveBeenCalledTimes(0);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(getUrl).toHaveBeenCalledTimes(2);
    expect(result.current.url).toBe(undefined);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(secondError);
  });

  it.only('does not call `onError`if it is not a function', async () => {
    const customError = new Error('Something went wrong');
    const { onError, ...getUrlParams } = KEY_INPUT;

    (getUrl as jest.Mock).mockRejectedValueOnce(customError);

    const { result, waitForNextUpdate } = renderHook(() =>
      // @ts-expect-error test against invalid input
      useGetUrl({...KEY_INPUT, onError: null})
    );

    expect(result.current.isLoading).toBe(true);
    expect(getUrl).toHaveBeenCalledWith(getUrlParams);
    expect(result.current.url).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.url).toBe(undefined);
    expect(onError).toHaveBeenCalledTimes(0);
  })

});
