import React from 'react';
import { act, render, renderHook } from '@testing-library/react';

import { ERROR_MESSAGE, LocationProvider, useLocation } from '../context';
import { LocationData } from '../../../../actions';

describe('useLocation', () => {
  it('provides the expected values in the happy path', () => {
    const { result } = renderHook(useLocation, {
      wrapper: ({ children }) => (
        <LocationProvider>{children}</LocationProvider>
      ),
    });

    const [state, handler] = result.current;

    expect(state).toStrictEqual({ current: undefined, path: '', key: '' });
    expect(handler).toStrictEqual(expect.any(Function));
  });

  it('provides the expected values when initiated with a default value', () => {
    const location = {
      bucket: 'bucket',
      id: 'id',
      permissions: ['delete', 'get', 'list', 'write'],
      prefix: 'prefix/',
      type: 'OBJECT' as const,
    } as LocationData;
    const path = 'path';

    const { result } = renderHook(useLocation, {
      wrapper: ({ children }) => (
        <LocationProvider location={location} path={path}>
          {children}
        </LocationProvider>
      ),
    });

    const state = result.current[0];

    expect(state).toStrictEqual({
      current: location,
      path,
      key: `${location.prefix}${path}`,
    });
  });

  it('updates `Location` with a new `location` as expected', () => {
    const location = {
      bucket: 'bucket',
      id: 'id',
      permissions: ['delete', 'get', 'list', 'write'],
      prefix: 'prefix/',
      type: 'OBJECT' as const,
    } as LocationData;

    const { result } = renderHook(useLocation, {
      wrapper: ({ children }) => (
        <LocationProvider location={location}>{children}</LocationProvider>
      ),
    });

    const [initialState, handler] = result.current;

    expect(initialState).toStrictEqual({
      current: location,
      path: '',
      key: location.prefix,
    });

    const nextLocation = {
      bucket: 'next-bucket',
      id: 'next-id',
      permissions: ['delete', 'get', 'list', 'write'],
      prefix: 'next-prefix/',
      type: 'OBJECT' as const,
    } as LocationData;

    act(() => {
      handler({ type: 'NAVIGATE', location: nextLocation });
    });

    const [nextState] = result.current;

    expect(nextState).toStrictEqual({
      current: nextLocation,
      path: '',
      key: nextLocation.prefix,
    });
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
