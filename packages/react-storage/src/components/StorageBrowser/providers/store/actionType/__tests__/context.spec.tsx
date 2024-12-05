import React from 'react';
import { renderHook } from '@testing-library/react';

import { ActionTypeProvider, useActionType } from '../context';

describe('useActionType', () => {
  it('provides the expected values in the happy path', () => {
    const { result } = renderHook(useActionType, {
      wrapper: ({ children }) => (
        <ActionTypeProvider>{children}</ActionTypeProvider>
      ),
    });

    const [state, handler] = result.current;

    expect(state).toBeUndefined();
    expect(typeof handler).toBe('function');
  });
});
