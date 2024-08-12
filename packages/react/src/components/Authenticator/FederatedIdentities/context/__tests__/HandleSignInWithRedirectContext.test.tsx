import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import {
  HandleSignInWithRedirectProvider,
  useHandleSignInWithRedirectContext,
} from '../HandleSignInWithRedirectContext';
import { signInWithRedirect } from 'aws-amplify/auth';

describe('useHandleSignInWithRedirectContext', () => {
  const customRedirect = jest.fn();

  it('should return the default signInWithRedirect function when no custom redirect is provided', () => {
    const { result } = renderHook(() => useHandleSignInWithRedirectContext());

    expect(result.current).toBe(signInWithRedirect);
  });

  it('should return the custom redirect function when provided', () => {
    const wrapper = ({ children }) => (
      <HandleSignInWithRedirectProvider customRedirect={customRedirect}>
        {children}
      </HandleSignInWithRedirectProvider>
    );

    const { result } = renderHook(() => useHandleSignInWithRedirectContext(), {
      wrapper,
    });

    expect(result.current).toBe(customRedirect);
  });
});
