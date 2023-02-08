import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';
import * as UIModule from '@aws-amplify/ui';

import { AuthenticatorProvider } from '../../../context';
import { USE_AUTHENTICATOR_ERROR } from '../constants';
import * as utils from '../utils';
import { useAuthenticator, UseAuthenticator } from '..';

const mockServiceFacade: AuthenticatorServiceFacade = {
  authStatus: 'authenticated',
  codeDeliveryDetails: {} as UseAuthenticator['codeDeliveryDetails'],
  error: undefined as unknown as UseAuthenticator['error'],
  hasValidationErrors: false,
  isPending: false,
  route: 'idle',
  socialProviders: [],
  unverifiedContactMethods: { email: 'test#example.com' },
  user: {} as UseAuthenticator['user'],
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
  toResetPassword: jest.fn(),
  toSignIn: jest.fn(),
  toSignUp: jest.fn(),
  skipVerification: jest.fn(),
};

const getServiceFacadeSpy = jest
  .spyOn(UIModule, 'getServiceFacade')
  .mockReturnValue(mockServiceFacade);

// test setup
jest.mock('@xstate/react', () => ({
  ...jest.requireActual('@xstate/react'),
  useSelector: jest.fn((_, selector: () => AuthenticatorServiceFacade) =>
    selector()
  ),
}));

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');

jest.mock('../utils');
const getComparatorSpy = jest.spyOn(utils, 'getComparator');
const getQRFieldsSpy = jest.spyOn(utils, 'getQRFields');

const Wrapper = ({ children }: { children?: React.ReactNode }) => (
  <AuthenticatorProvider>{children}</AuthenticatorProvider>
);

describe('useAuthenticator', () => {
  beforeEach(() => {
    getComparatorSpy.mockClear();
    getServiceFacadeSpy.mockClear();
  });

  it('throws an error when used outside an AuthenticatorProvider', () => {
    const { result } = renderHook(useAuthenticator);

    expect(result.error?.message).toBe(USE_AUTHENTICATOR_ERROR);
  });

  it('returns the expected values', () => {
    const { result } = renderHook(useAuthenticator, {
      wrapper: Wrapper,
    });

    expect(getServiceFacadeSpy).toHaveBeenCalled();

    expect(result.current).toMatchSnapshot();
  });

  it('calls getComparator with the selector argument', () => {
    const mockSelector = jest.fn();

    renderHook(() => useAuthenticator(mockSelector), { wrapper: Wrapper });

    expect(getComparatorSpy).toHaveBeenLastCalledWith(mockSelector);
  });

  it('does not call getComparator when no selector argument passed', () => {
    renderHook(useAuthenticator, { wrapper: Wrapper });

    expect(getComparatorSpy).not.toBeCalled();
  });

  it('calls getQRFields only for the setupTOTP route', () => {
    getServiceFacadeSpy.mockReturnValueOnce({
      ...mockServiceFacade,
      route: 'signIn',
    });

    const { rerender } = renderHook(useAuthenticator, { wrapper: Wrapper });

    expect(getQRFieldsSpy).toHaveBeenCalledTimes(0);

    getServiceFacadeSpy.mockReturnValueOnce({
      ...mockServiceFacade,
      route: 'setupTOTP',
    });

    rerender();

    expect(getQRFieldsSpy).toHaveBeenCalledTimes(1);

    getServiceFacadeSpy.mockReturnValueOnce({
      ...mockServiceFacade,
      route: 'signOut',
    });

    rerender();

    expect(getQRFieldsSpy).toHaveBeenCalledTimes(1);
  });
});
