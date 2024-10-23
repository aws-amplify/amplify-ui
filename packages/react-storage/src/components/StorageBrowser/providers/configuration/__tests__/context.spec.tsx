import React from 'react';
import { renderHook } from '@testing-library/react';
import * as CredentialsModule from '../credentials';

import { GetActionInputProvider, useGetActionInput } from '../context';

jest.spyOn(CredentialsModule, 'useCredentials').mockReturnValue({
  destroy: jest.fn(),
  getCredentials: jest.fn(),
});

describe('useGetActionInput', () => {
  it('provides the expected value in the happy path', () => {
    const { result } = renderHook(useGetActionInput, {
      wrapper: ({ children }) => (
        <GetActionInputProvider region="my-region">
          {children}
        </GetActionInputProvider>
      ),
    });

    expect(typeof result.current).toBe('function');
  });
});
