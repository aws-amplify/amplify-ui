import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

import { AuthenticatorProvider } from '../../../context';
import { USE_AUTHENTICATOR_ERROR } from '../constants';
import * as utils from '../utils';
import { useAuthenticator } from '..';

// test setup
jest.mock('@xstate/react', () => ({
  ...jest.requireActual('@xstate/react'),
  useSelector: jest.fn((service: AuthenticatorServiceFacade) => service),
}));

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');

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

  it('returns the expected values', () => {
    const { result } = renderHook(useAuthenticator, {
      wrapper: Wrapper,
    });

    expect(result.current).toMatchSnapshot();
  });

  it('calls getComparator with the selector argument', () => {
    const mockSelector = jest.fn();

    renderHook(() => useAuthenticator(mockSelector), { wrapper: Wrapper });

    expect(getComparatorSpy).toHaveBeenLastCalledWith(mockSelector);
  });
});
