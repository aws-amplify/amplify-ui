import React from 'react';

import { renderHook, WrapperComponent } from '@testing-library/react-hooks';

import * as AuthModule from 'aws-amplify/auth';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';
import * as UIModule from '@aws-amplify/ui';

import { AuthenticatorProvider } from '../../../context';
import { USE_AUTHENTICATOR_ERROR } from '../constants';
import * as utils from '../utils';
import { useAuthenticator, UseAuthenticator } from '..';

const mockServiceFacade: AuthenticatorServiceFacade = {
  authStatus: 'authenticated',
  challengeName: 'SELECT_MFA_TYPE',
  codeDeliveryDetails: {} as UseAuthenticator['codeDeliveryDetails'],
  error: undefined as unknown as UseAuthenticator['error'],
  hasValidationErrors: false,
  isPending: false,
  route: 'idle',
  socialProviders: [],
  unverifiedUserAttributes: { email: 'test#example.com' },
  user: { userId: 'userId', username: 'username' },
  username: 'sally',
  validationErrors:
    undefined as unknown as UseAuthenticator['validationErrors'],
  totpSecretCode: null,
  initializeMachine: jest.fn(),
  resendCode: jest.fn(),
  signOut: jest.fn(),
  submitForm: jest.fn(),
  updateForm: jest.fn(),
  updateBlur: jest.fn(),
  toFederatedSignIn: jest.fn(),
  toForgotPassword: jest.fn(),
  toSignIn: jest.fn(),
  toSignUp: jest.fn(),
  skipVerification: jest.fn(),
  allowedMfaTypes: ['EMAIL', 'TOTP'],
};

const getServiceFacadeSpy = jest
  .spyOn(UIModule, 'getServiceFacade')
  .mockReturnValue(mockServiceFacade);

// test setup
jest.mock('@xstate/react', () => ({
  ...jest.requireActual<typeof import('@xstate/react')>('@xstate/react'),
  useSelector: jest.fn((_, selector: () => AuthenticatorServiceFacade) =>
    selector()
  ),
}));

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');

jest.mock('../utils');
const getComparatorSpy = jest.spyOn(utils, 'getComparator');
const getQRFieldsSpy = jest.spyOn(utils, 'getQRFields');

const Wrapper: WrapperComponent<{ children?: React.ReactNode }> = ({
  children,
}) => <AuthenticatorProvider>{children}</AuthenticatorProvider>;

jest
  .spyOn(AuthModule, 'getCurrentUser')
  .mockResolvedValue({ userId: '1234', username: 'test' });

describe('useAuthenticator', () => {
  beforeEach(() => {
    getComparatorSpy.mockClear();
    getServiceFacadeSpy.mockClear();
  });

  it('throws an error when used outside an AuthenticatorProvider', () => {
    const { result } = renderHook(useAuthenticator);

    expect(result.error?.message).toBe(USE_AUTHENTICATOR_ERROR);
  });

  it('returns the expected values', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthenticator(), {
      wrapper: Wrapper,
    });

    await waitForNextUpdate();

    expect(getServiceFacadeSpy).toHaveBeenCalled();

    expect(result.current).toMatchSnapshot();
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

  it('does not call getComparator when no selector argument passed', async () => {
    const { waitForNextUpdate } = renderHook(() => useAuthenticator(), {
      wrapper: Wrapper,
    });

    await waitForNextUpdate();

    expect(getComparatorSpy).not.toHaveBeenCalled();
  });

  it('calls getQRFields only for the setupTotp route', async () => {
    getServiceFacadeSpy.mockReturnValueOnce({
      ...mockServiceFacade,
      route: 'signIn',
    });

    const { rerender, waitForNextUpdate } = renderHook(
      () => useAuthenticator(),
      {
        wrapper: Wrapper,
      }
    );

    expect(getQRFieldsSpy).toHaveBeenCalledTimes(0);

    getServiceFacadeSpy.mockReturnValueOnce({
      ...mockServiceFacade,
      route: 'setupTotp',
    });

    await waitForNextUpdate();

    expect(getQRFieldsSpy).toHaveBeenCalledTimes(1);

    getServiceFacadeSpy.mockReturnValueOnce({
      ...mockServiceFacade,
      route: 'signOut',
    });

    rerender();

    expect(getQRFieldsSpy).toHaveBeenCalledTimes(1);
  });
});
