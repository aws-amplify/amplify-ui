import { renderHook } from '@testing-library/react-hooks';
import * as Storage from 'aws-amplify/storage';

import { useGetUrl, UseGetUrlInput } from '../useGetUrl';

const getUrlSpy = jest.spyOn(Storage, 'getUrl');

const url = new URL('https://amplify.s3.amazonaws.com/path/to/the/file.jpg');

const onErrorMock = jest.fn();

const KEY_INPUT: UseGetUrlInput = {
  key: 'file.jpg',
  options: { accessLevel: 'guest' },
  onError: onErrorMock,
};

const PATH_INPUT: UseGetUrlInput = {
  path: 'guest/file.jpg',
  onError: onErrorMock,
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

describe('useGetUrl', () => {
  it.each(paramType)(
    `should return true for isLoading at initialization $description`,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ useGetUrlParams, description }) => {
      getUrlSpy.mockResolvedValue({ url, expiresAt: new Date() });
      const { result } = renderHook(() => useGetUrl(useGetUrlParams));
      expect(result.current.isLoading).toBe(true);
      expect(result.current.url).toBe(undefined);

      getUrlSpy.mockClear();
    }
  );

  it.each(paramType)(
    'should return a Storage URL $description',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ useGetUrlParams, description }) => {
      getUrlSpy.mockResolvedValue({ url, expiresAt: new Date() });

      const { onError, ...getUrlParams } = useGetUrlParams;

      const { result, waitForNextUpdate } = renderHook(() =>
        useGetUrl(useGetUrlParams)
      );

      expect(getUrlSpy).toHaveBeenCalledWith(getUrlParams);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.url).toBe(undefined);

      // Next update will happen when getUrl resolves
      await waitForNextUpdate();

      expect(getUrlSpy).toHaveBeenCalledTimes(1);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.url).toBe(url);

      getUrlSpy.mockClear();
    }
  );

  it.each(paramType)(
    'should invoke $errorHandler when getUrl fails $description',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ useGetUrlParams, description, errorHandler }) => {
      const customError = new Error('Something went wrong');
      const { onError, ...getUrlParams } = useGetUrlParams;
      getUrlSpy.mockRejectedValue(customError);

      const { result, waitForNextUpdate } = renderHook(() =>
        useGetUrl(useGetUrlParams)
      );

      expect(getUrlSpy).toHaveBeenCalledWith(getUrlParams);

      // Next update will happen when getUrl resolves
      await waitForNextUpdate();

      expect(result.current.isLoading).toBe(false);
      expect(result.current.url).toBe(undefined);
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(customError);

      getUrlSpy.mockClear();
      onErrorMock.mockClear();
    }
  );

  it('ignores the first response if rerun a second time before the first call resolves in the happy path', async () => {
    const secondUrl = new URL(
      'https://amplify.s3.amazonaws.com/path/to/the/second-file.jpg'
    );

    getUrlSpy
      .mockResolvedValueOnce({ url, expiresAt: new Date() })
      .mockResolvedValueOnce({ url: secondUrl, expiresAt: new Date() });

    const { onError, ...getUrlParams } = KEY_INPUT;

    const { result, waitForNextUpdate, rerender } = renderHook(
      (input: UseGetUrlInput = KEY_INPUT) => useGetUrl(input)
    );

    expect(getUrlSpy).toHaveBeenCalledWith(getUrlParams);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.url).toBe(undefined);

    rerender({ ...KEY_INPUT, key: 'second-file.jpg' });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.url).toBe(undefined);

    // Next update will happen when getUrl resolves
    await waitForNextUpdate();

    expect(getUrlSpy).toHaveBeenCalledWith({
      ...getUrlParams,
      key: 'second-file.jpg',
    });

    expect(getUrlSpy).toHaveBeenCalledTimes(2);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.url).toBe(secondUrl);

    getUrlSpy.mockClear();
  });

  it('ignores the first response if rerun a second time before the first call resolves in the unhappy path', async () => {
    const firstError = new Error('Something went wrong');
    const secondError = new Error('Something went wrong again');

    const { onError } = PATH_INPUT;
    getUrlSpy
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
    expect(getUrlSpy).toHaveBeenCalledTimes(2);
    expect(result.current.url).toBe(undefined);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(secondError);

    getUrlSpy.mockClear();
    onErrorMock.mockClear();
  });

  it('does not call `onError` if it is not a function', async () => {
    const customError = new Error('Something went wrong');
    const { onError, ...getUrlParams } = KEY_INPUT;

    getUrlSpy.mockRejectedValueOnce(customError);

    const input = { ...KEY_INPUT, onError: null };

    const { result, waitForNextUpdate } = renderHook(() =>
      // @ts-expect-error test against invalid input
      useGetUrl(input)
    );

    expect(result.current.isLoading).toBe(true);
    expect(getUrlSpy).toHaveBeenCalledWith(getUrlParams);
    expect(result.current.url).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.url).toBe(undefined);
    expect(onError).toHaveBeenCalledTimes(0);

    getUrlSpy.mockClear();
  });
});
