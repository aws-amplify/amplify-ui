import React from 'react';
import { renderHook } from '@testing-library/react';

import { CredentialsProvider, useCredentials } from '../context';

describe('useCredentials', () => {
  it('provides the expected values in the happy path', () => {
    const getLocationCredentials = jest.fn();
    const registerAuthListener = jest.fn();

    const { result } = renderHook(useCredentials, {
      wrapper: ({ children }) => (
        <CredentialsProvider
          getLocationCredentials={getLocationCredentials}
          registerAuthListener={registerAuthListener}
        >
          {children}
        </CredentialsProvider>
      ),
    });

    expect(typeof result.current.destroy).toBe('function');
    expect(typeof result.current.getCredentials).toBe('function');
  });
});
