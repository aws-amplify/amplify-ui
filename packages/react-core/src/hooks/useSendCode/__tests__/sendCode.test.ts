import { act, renderHook } from '@testing-library/react-hooks';

import {
  sendUserAttributeVerificationCode,
  SendUserAttributeVerificationCodeInput,
  SendUserAttributeVerificationCodeOutput,
} from '@aws-amplify/auth';

import {
  DefaultSendUserAttributeVerificationCodeOutput,
  useSendUserAttributeVerificationCode,
} from '../constants';

jest.mock('@aws-amplify/auth', () => ({
  sendUserAttributeVerificationCode: jest.fn(),
}));

const mockInput: SendUserAttributeVerificationCodeInput = {
  userAttributeKey: 'email',
};
const mockOutput: SendUserAttributeVerificationCodeOutput = {
  attributeName: 'email',
  deliveryMedium: 'EMAIL',
  destination: 'a***@b.com',
};

const mockError = new Error('Sample error');

describe('useSendCode', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(jest.clearAllMocks);

  it('data should be default if error received', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSendUserAttributeVerificationCode()
    );

    (sendUserAttributeVerificationCode as jest.Mock).mockRejectedValue(
      mockError
    );

    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();

    expect(result.current[0].data).toBe(
      DefaultSendUserAttributeVerificationCodeOutput
    );
  });
  it('should have an error message if error occurs', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSendUserAttributeVerificationCode()
    );

    (sendUserAttributeVerificationCode as jest.Mock).mockRejectedValue(
      mockError
    );
    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();

    expect(result.current[0].message).toBe(String(mockError));
  });
  it('should have hasError truthy if error occurs', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSendUserAttributeVerificationCode()
    );

    (sendUserAttributeVerificationCode as jest.Mock).mockRejectedValue(
      mockError
    );
    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();

    expect(result.current[0].hasError).toBeTruthy();
  });

  it('data should be mockOutput if successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSendUserAttributeVerificationCode()
    );
    (sendUserAttributeVerificationCode as jest.Mock).mockResolvedValueOnce(
      mockOutput
    );
    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();
    expect(result.current[0].data).toStrictEqual(mockOutput);
  });
  it('should have hasError falsy if successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSendUserAttributeVerificationCode()
    );
    (sendUserAttributeVerificationCode as jest.Mock).mockResolvedValueOnce(
      mockOutput
    );
    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();
    expect(result.current[0].hasError).toBeFalsy();
  });
  it('should have message falsy if successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSendUserAttributeVerificationCode()
    );
    (sendUserAttributeVerificationCode as jest.Mock).mockResolvedValueOnce(
      mockOutput
    );
    act(async () => {
      await new Promise<void>((resolve) => {
        result.current[1](mockInput);
        resolve();
      });
    });

    await waitForNextUpdate();
    expect(result.current[0].message).toBeFalsy();
  });
});
