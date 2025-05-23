import { renderHook, waitFor } from '@testing-library/react-native';
import QRCodeModule from 'qrcode';

import { useQRCodeString, UseQRCodeStringParams } from '../useQRCodeString';

const toStringSpy = jest.spyOn(QRCodeModule, 'toString');
const TEST_STRING = 'testy';

const onError = jest.fn();
const onSuccess = jest.fn();

const BASE_INPUT = { text: TEST_STRING, onError, onSuccess };
const INVALID_INPUT = {
  text: TEST_STRING,
  onError: 'not a function',
  onSuccess: 'also not a function',
};

describe('useQRCodeString', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('behaves as expected in the happy path', async () => {
    const { result } = renderHook((input: UseQRCodeStringParams = BASE_INPUT) =>
      useQRCodeString(input)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.qrCodeString).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasError).toBe(false);
      expect(result.current.qrCodeString).toMatchSnapshot();
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith(result.current.qrCodeString);
  });

  it('behaves as expected when `toString` throws an error', async () => {
    const error = new Error('Rejected!');

    (toStringSpy as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useQRCodeString(BASE_INPUT));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.qrCodeString).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasError).toBe(true);
      expect(result.current.qrCodeString).toBeNull();
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(error.message);
  });

  it('does not call `toString` when `text` param is not provided', () => {
    const { result } = renderHook(useQRCodeString);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.qrCodeString).toBeNull();
  });

  it('ignores the first response if rerun a second time before the first call resolves in the happy path', async () => {
    const firstResponse = 'first response';
    const secondResponse = 'second response';

    (toStringSpy as jest.Mock)
      .mockResolvedValueOnce(firstResponse)
      .mockResolvedValueOnce(secondResponse);

    const { result, rerender } = renderHook(
      (input: UseQRCodeStringParams = BASE_INPUT) => useQRCodeString(input)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.qrCodeString).toBeNull();

    rerender({ ...BASE_INPUT, text: 'new value' });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.qrCodeString).toBeNull();

    await waitFor(() => {
      expect(toStringSpy).toHaveBeenCalledTimes(2);

      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasError).toBe(false);
      expect(result.current.qrCodeString).toBe(secondResponse);
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith(secondResponse);
  });

  it('ignores the first response if rerun a second time before the first call resolves in the unhappy path', async () => {
    const firstError = new Error('first response');
    const secondError = new Error('second response');

    (toStringSpy as jest.Mock)
      .mockRejectedValueOnce(firstError)
      .mockRejectedValueOnce(secondError);

    const { result, rerender } = renderHook(
      (input: UseQRCodeStringParams = BASE_INPUT) => useQRCodeString(input)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.qrCodeString).toBeNull();

    rerender({ ...BASE_INPUT, text: 'new value' });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.qrCodeString).toBeNull();

    await waitFor(() => {
      expect(toStringSpy).toHaveBeenCalledTimes(2);

      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasError).toBe(true);
      expect(result.current.qrCodeString).toBeNull();
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(secondError.message);
  });

  it('calls `toString` when `text` param changes', async () => {
    const { rerender } = renderHook(
      (input: UseQRCodeStringParams = BASE_INPUT) => useQRCodeString(input)
    );

    await waitFor(() => {
      expect(toStringSpy).toHaveBeenCalledTimes(1);
    });

    // rerender with same input
    rerender(BASE_INPUT);

    expect(toStringSpy).toHaveBeenCalledTimes(1);

    // rerender with new `text` param
    rerender({ ...BASE_INPUT, text: 'new value' });

    await waitFor(() => {
      expect(toStringSpy).toHaveBeenCalledTimes(2);
    });
  });

  it('does not call `onSuccess` if it is not a function', async () => {
    const { result } = renderHook(
      // @ts-expect-error test against invalid input
      () => useQRCodeString(INVALID_INPUT)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.qrCodeString).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasError).toBe(false);
      expect(result.current.qrCodeString).toMatchSnapshot();
    });
  });

  it('does not call `onError` if it is not a function', async () => {
    const error = new Error('Rejected!');

    (toStringSpy as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(
      // @ts-expect-error test against invalid input
      () => useQRCodeString(INVALID_INPUT)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.qrCodeString).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasError).toBe(true);
      expect(result.current.qrCodeString).toBeNull();
    });
  });
});
