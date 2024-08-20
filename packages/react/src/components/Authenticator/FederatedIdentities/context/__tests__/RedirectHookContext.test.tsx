import React from 'react';
import { act, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { signInWithRedirect } from 'aws-amplify/auth';
import {
  useRedirectHook,
  UseHandleSignInWithRedirectProvider,
} from '../RedirectHookContext';
import * as AuthModule from 'aws-amplify/auth';

const signInWithRedirectSpy = jest.spyOn(AuthModule, 'signInWithRedirect');
const customSignInWithRedirect = jest.fn();

const MOCK_ERROR = new Error('signInWithRedirect failure');
const EXPECTED_LOADING_STATE = {
  data: undefined,
  hasError: false,
  isLoading: true,
  message: undefined,
};
const EXPECTED_ERROR_STATE = {
  data: undefined,
  hasError: true,
  isLoading: false,
  message: MOCK_ERROR.message,
};

describe('useHandleSignInWithRedirect', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('useSignInWithRedirect with no input', async () => {
    signInWithRedirectSpy.mockImplementationOnce(() => {
      return Promise.resolve();
    });

    const wrapper = ({ children }) => (
      <UseHandleSignInWithRedirectProvider>
        {children}
      </UseHandleSignInWithRedirectProvider>
    );

    const { result } = renderHook(() => useRedirectHook(), {
      wrapper,
    });

    const [_, handler] = result.current;

    await act(async () => {
      handler({ provider: 'Google' });
    });

    expect(signInWithRedirect).toHaveBeenCalledWith({ provider: 'Google' });
  });

  it('uses the custom function when it is passed in', async () => {
    const wrapper = ({ children }) => (
      <UseHandleSignInWithRedirectProvider
        handleSignInWithRedirect={customSignInWithRedirect}
      >
        {children}
      </UseHandleSignInWithRedirectProvider>
    );

    const { result } = renderHook(() => useRedirectHook(), {
      wrapper,
    });

    const [_, handler] = result.current;

    await act(async () => {
      handler({ provider: { custom: 'Okta' } });
    });

    expect(customSignInWithRedirect).toHaveBeenCalledWith({
      provider: { custom: 'Okta' },
    });
    expect(signInWithRedirect).not.toHaveBeenCalled();
  });

  it('updates the state correctly', async () => {
    signInWithRedirectSpy.mockImplementationOnce(async () => {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(MOCK_ERROR);
        }, 10);
      });
    });

    const wrapper = ({ children }) => (
      <UseHandleSignInWithRedirectProvider>
        {children}
      </UseHandleSignInWithRedirectProvider>
    );

    const { result } = renderHook(() => useRedirectHook(), {
      wrapper,
    });

    renderHook(() => result.current[1]({ provider: 'Facebook' }));

    expect(result.current[0]).toEqual(EXPECTED_LOADING_STATE);

    await waitFor(() => {
      expect(result.current[0]).toEqual(EXPECTED_ERROR_STATE);
    });
  });

  it('throws an error if not used within provider', () => {
    const { result } = renderHook(() => useRedirectHook());

    expect(() => result.current).toThrow(
      'useHandleSignInWithRedirect must be used within a UseHandleSignInWithRedirectProvider'
    );
  });
});
