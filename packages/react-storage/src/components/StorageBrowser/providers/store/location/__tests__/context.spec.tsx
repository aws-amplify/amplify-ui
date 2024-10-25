import React from 'react';
import { act, render, renderHook } from '@testing-library/react';

import { ERROR_MESSAGE, LocationProvider, useLocation } from '../context';

describe('useLocation', () => {
  it('provides the expected values in the happy path', () => {
    const { result } = renderHook(useLocation, {
      wrapper: ({ children }) => (
        <LocationProvider>{children}</LocationProvider>
      ),
    });

    const [state, handler] = result.current;

    expect(state).toStrictEqual({ current: undefined, path: undefined });
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
    const path = 'path';

    const { result } = renderHook(useLocation, {
      wrapper: ({ children }) => (
        <LocationProvider location={location} path={path}>
          {children}
        </LocationProvider>
      ),
    });

    const state = result.current[0];

    expect(state).toStrictEqual({ current: location, path });
  });

  it('updates `Location` with a new `location` as expected', () => {
    const location = {
      bucket: 'bucket',
      id: 'id',
      permission: 'READWRITE' as const,
      prefix: 'prefix',
      type: 'OBJECT' as const,
    };

    const { result } = renderHook(useLocation, {
      wrapper: ({ children }) => (
        <LocationProvider location={location}>{children}</LocationProvider>
      ),
    });

    const [initialState, handler] = result.current;

    expect(initialState).toStrictEqual({ current: location, path: undefined });

    const nextLocation = {
      bucket: 'next-bucket',
      id: 'next-id',
      permission: 'READWRITE' as const,
      prefix: 'next-prefix',
      type: 'OBJECT' as const,
    };

    act(() => {
      handler({ type: 'NAVIGATE', location: nextLocation });
    });

    const [nextState] = result.current;

    expect(nextState).toStrictEqual({ current: nextLocation, path: undefined });
  });

  it('`LocationProvider` throws when provided `location` is invalid', () => {
    // Mock implementation for console.error to prevent logging during tests
    jest.spyOn(console, 'error').mockImplementation(() => null);

    // @ts-expect-error force invalid location
    expect(() => render(<LocationProvider location={{}} />)).toThrow(
      ERROR_MESSAGE
    );
  });
});
