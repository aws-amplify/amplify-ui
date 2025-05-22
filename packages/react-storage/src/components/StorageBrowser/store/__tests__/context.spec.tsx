import React from 'react';
import { renderHook } from '@testing-library/react';

import { DEFAULT_STATE } from '../constants';
import { StoreProvider, useStore } from '../context';

describe('useStore', () => {
  it('provides the expected values when wrapped with a `StoreProvider`', () => {
    const { result } = renderHook(useStore, {
      wrapper: ({ children }) => <StoreProvider>{children}</StoreProvider>,
    });

    const [state, handler] = result.current;

    expect(state).toBe(DEFAULT_STATE);
    expect(handler).toStrictEqual(expect.any(Function));
  });

  it('provides the expected values when not wrapped with a `StoreProvider`', () => {
    const { result } = renderHook(useStore);

    const [state, handler] = result.current;

    expect(state).toBe(DEFAULT_STATE);
    expect(handler).toStrictEqual(expect.any(Function));
  });
});
