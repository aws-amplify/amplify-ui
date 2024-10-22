import React from 'react';
import { renderHook } from '@testing-library/react';

import { HistoryProvider, useHistory } from '../context';

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
});
