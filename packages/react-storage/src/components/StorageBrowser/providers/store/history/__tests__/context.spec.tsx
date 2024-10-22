import React from 'react';
import { act, render, renderHook } from '@testing-library/react';

import { ERROR_MESSAGE, HistoryProvider, useHistory } from '../context';

describe('useHistory', () => {
  it('provides the expected values in the happy path', () => {
    const { result } = renderHook(useHistory, {
      wrapper: ({ children }) => <HistoryProvider>{children}</HistoryProvider>,
    });

    const [state, handler] = result.current;

    expect(state).toStrictEqual({ current: undefined, history: undefined });
    expect(handler).toStrictEqual(expect.any(Function));
  });

  it('provides the expected values when initiated with a default value', () => {
    const location = {
      bucket: 'bucket',
      id: 'id',
      permission: 'READWRITE' as const,
      prefix: 'prefix',
      type: 'OBJECT' as const,
    };

    const { result } = renderHook(useHistory, {
      wrapper: ({ children }) => (
        <HistoryProvider location={location}>{children}</HistoryProvider>
      ),
    });

    const state = result.current[0];

    expect(state).toStrictEqual({ current: location, history: [location] });
  });

  it('updates `history` with a new `location` as expected', () => {
    const location = {
      bucket: 'bucket',
      id: 'id',
      permission: 'READWRITE' as const,
      prefix: 'prefix',
      type: 'OBJECT' as const,
    };

    const { result } = renderHook(useHistory, {
      wrapper: ({ children }) => (
        <HistoryProvider location={location}>{children}</HistoryProvider>
      ),
    });

    const [initialState, handler] = result.current;

    expect(initialState).toStrictEqual({
      current: location,
      history: [location],
    });

    const nextLocation = {
      bucket: 'next-bucket',
      id: 'next-id',
      permission: 'READWRITE' as const,
      prefix: 'next-prefix',
      type: 'OBJECT' as const,
    };

    act(() => {
      handler({ type: 'NAVIGATE', destination: nextLocation });
    });

    const [nextState] = result.current;

    expect(nextState).toStrictEqual({
      current: nextLocation,
      history: [location, nextLocation],
    });
  });

  it('`HistoryProvider` throws when provided `location` is invalid', () => {
    // Mock implementation for console.error to prevent logging during tests
    jest.spyOn(console, 'error').mockImplementation(() => null);

    // @ts-expect-error force invalid location
    expect(() => render(<HistoryProvider location={{}} />)).toThrow(
      ERROR_MESSAGE
    );
  });
});
