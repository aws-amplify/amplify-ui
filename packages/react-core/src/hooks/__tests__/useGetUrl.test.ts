import { renderHook, waitFor } from '@testing-library/react';
import * as Storage from 'aws-amplify/storage';

import useGetUrl, { UseGetUrlInput } from '../useGetUrl';

const getUrlSpy = jest.spyOn(Storage, 'getUrl');

const url = new URL('https://amplify.s3.amazonaws.com/path/to/the/file.jpg');

const onError = jest.fn();

const KEY_INPUT: UseGetUrlInput = {
  key: 'file.jpg',
  options: { accessLevel: 'guest' },
  onError,
};

const PATH_INPUT: UseGetUrlInput = {
  path: 'guest/file.jpg',
  onError,
};

describe('useGetUrl', () => {
  beforeEach(() => {
    getUrlSpy.mockClear();
    onError.mockClear();
  });

  describe('with key params', () => {
    it('should return a Storage URL', async () => {
      getUrlSpy.mockResolvedValue({ url, expiresAt: new Date() });

      const { result } = renderHook(() => useGetUrl(KEY_INPUT));

      expect(getUrlSpy).toHaveBeenCalledWith({
        key: KEY_INPUT.key,
        options: KEY_INPUT.options,
      });
      expect(result.current.isLoading).toBe(true);
      expect(result.current.url).toBe(undefined);

      // Next update will happen when getUrl resolves
      await waitFor(() => {
        expect(getUrlSpy).toHaveBeenCalledTimes(1);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.url).toBe(url);
      });
    });

    it('should invoke onStorageGetError when getUrl fails', async () => {
      const customError = new Error('Something went wrong');
      getUrlSpy.mockRejectedValue(customError);

      const { result } = renderHook(() => useGetUrl(KEY_INPUT));

      expect(getUrlSpy).toHaveBeenCalledWith({
        key: KEY_INPUT.key,
        options: KEY_INPUT.options,
      });

      // Next update will happen when getUrl resolves
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.url).toBe(undefined);
        expect(onError).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledWith(customError);
      });
    });
  });

  describe('with path params', () => {
    it('should return a Storage URL', async () => {
      getUrlSpy.mockResolvedValue({ url, expiresAt: new Date() });

      const { result } = renderHook(() => useGetUrl(PATH_INPUT));

      expect(getUrlSpy).toHaveBeenCalledWith({ path: PATH_INPUT.path });
      expect(result.current.isLoading).toBe(true);
      expect(result.current.url).toBe(undefined);

      // Next update will happen when getUrl resolves
      await waitFor(() => {
        expect(getUrlSpy).toHaveBeenCalledTimes(1);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.url).toBe(url);
      });
    });

    it('should invoke onGetUrlError when getUrl fails', async () => {
      const customError = new Error('Something went wrong');
      getUrlSpy.mockRejectedValue(customError);

      const { result } = renderHook(() => useGetUrl(PATH_INPUT));

      expect(getUrlSpy).toHaveBeenCalledWith({ path: PATH_INPUT.path });

      // Next update will happen when getUrl resolves
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.url).toBe(undefined);
        expect(onError).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledWith(customError);
      });
    });
  });

  it('ignores the first response if rerun a second time before the first call resolves in the happy path', async () => {
    const secondUrl = new URL(
      'https://amplify.s3.amazonaws.com/path/to/the/second-file.jpg'
    );

    getUrlSpy
      .mockResolvedValueOnce({ url, expiresAt: new Date() })
      .mockResolvedValueOnce({ url: secondUrl, expiresAt: new Date() });

    const { result, rerender } = renderHook(
      (input: UseGetUrlInput = PATH_INPUT) => useGetUrl(input)
    );

    expect(getUrlSpy).toHaveBeenCalledWith({ path: PATH_INPUT.path });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.url).toBe(undefined);

    rerender({ ...PATH_INPUT, path: 'guest/second-file.jpg' });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.url).toBe(undefined);

    // Next update will happen when getUrl resolves
    await waitFor(() => {
      expect(getUrlSpy).toHaveBeenCalledWith({
        path: 'guest/second-file.jpg',
      });

      expect(getUrlSpy).toHaveBeenCalledTimes(2);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.url).toBe(secondUrl);
    });
  });

  it('ignores the first response if rerun a second time before the first call resolves in the unhappy path', async () => {
    const firstError = new Error('Something went wrong');
    const secondError = new Error('Something went wrong again');

    getUrlSpy
      .mockRejectedValueOnce(firstError)
      .mockRejectedValueOnce(secondError);

    const { result, rerender } = renderHook(
      (input: UseGetUrlInput = PATH_INPUT) => useGetUrl(input)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.url).toBe(undefined);
    expect(onError).toHaveBeenCalledTimes(0);

    rerender({ ...PATH_INPUT, path: 'guest/second-file.jpg' });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.url).toBe(undefined);
    expect(onError).toHaveBeenCalledTimes(0);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(getUrlSpy).toHaveBeenCalledTimes(2);
      expect(result.current.url).toBe(undefined);
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(secondError);
    });
  });

  it('does not call `onError` if it is not a function', async () => {
    const customError = new Error('Something went wrong');

    getUrlSpy.mockRejectedValueOnce(customError);

    const input = { ...PATH_INPUT, onError: null };

    const { result } = renderHook(() =>
      // @ts-expect-error test against invalid input
      useGetUrl(input)
    );

    expect(result.current.isLoading).toBe(true);
    expect(getUrlSpy).toHaveBeenCalledWith({ path: PATH_INPUT.path });
    expect(result.current.url).toBe(undefined);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.url).toBe(undefined);
      expect(onError).toHaveBeenCalledTimes(0);
    });
  });
});
