import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import * as utils from '../utils';

import { AuthenticatorProvider } from '../../../context';
import { USE_AUTHENTICATOR_ERROR } from '../constants';
import { useAuthenticator, UseAuthenticator } from '..';

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');

// test setup
jest.mock('../utils');
const getComparatorSpy = jest.spyOn(utils, 'getComparator');

const Wrapper = ({ children }: { children?: React.ReactNode }) => (
  <AuthenticatorProvider>{children}</AuthenticatorProvider>
);

describe('useAuthenticator', () => {
  it('throws an error when used outside an AuthenticatorProvider', () => {
    const { result } = renderHook(useAuthenticator);

    expect(result.error?.message).toBe(USE_AUTHENTICATOR_ERROR);
  });

  it('returns the expected values', async () => {
    const { result, waitForNextUpdate } = renderHook(useAuthenticator, {
      wrapper: Wrapper,
    });

    await waitForNextUpdate();

    expect(result.current).toStrictEqual({
      // _send: expect.any(Function) as UseAuthenticator['_send'],
      // _state: expect.any(Object) as UseAuthenticator['_state'],
      authStatus: 'authenticated',
      codeDeliveryDetails: undefined,
      error: undefined,
      hasValidationErrors: undefined,
      isPending: undefined,
      resendCode: expect.any(Function) as UseAuthenticator['resendCode'],
      route: 'authenticated',
      signOut: expect.any(Function) as UseAuthenticator['signOut'],
      skipVerification: expect.any(
        Function
      ) as UseAuthenticator['skipVerification'],
      submitForm: expect.any(Function) as UseAuthenticator['submitForm'],
      toFederatedSignIn: expect.any(
        Function
      ) as UseAuthenticator['toFederatedSignIn'],
      toResetPassword: expect.any(
        Function
      ) as UseAuthenticator['toResetPassword'],
      toSignIn: expect.any(Function) as UseAuthenticator['toSignIn'],
      toSignUp: expect.any(Function) as UseAuthenticator['toSignUp'],
      updateBlur: expect.any(Function) as UseAuthenticator['updateBlur'],
      updateForm: expect.any(Function) as UseAuthenticator['updateForm'],
      user: undefined,
      validationErrors: undefined,
    });
  });

  it('calls getComparator with the selector argument', async () => {
    const mockSelector = jest.fn();

    const { waitForNextUpdate } = renderHook(
      () => useAuthenticator(mockSelector),
      { wrapper: Wrapper }
    );

    await waitForNextUpdate();

    expect(getComparatorSpy).toHaveBeenLastCalledWith(mockSelector);
  });
});
