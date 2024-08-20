import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import {
  RedirectFunctionProvider,
  useRedirectFunctionContext,
} from '../RedirectFunctionContext';
import { signInWithRedirect } from 'aws-amplify/auth';

describe('useHandleSignInWithRedirectContext', () => {
  const customRedirect = jest.fn();

  it('should return the default signInWithRedirect function when no custom redirect is provided', () => {
    const { result } = renderHook(() => useRedirectFunctionContext());

    expect(result.current).toBe(signInWithRedirect);
  });

  it('should return the custom redirect function when provided', () => {
    const wrapper = ({ children }) => (
      <RedirectFunctionProvider customRedirect={customRedirect}>
        {children}
      </RedirectFunctionProvider>
    );

    const { result } = renderHook(() => useRedirectFunctionContext(), {
      wrapper,
    });

    expect(result.current).toBe(customRedirect);
  });
});
