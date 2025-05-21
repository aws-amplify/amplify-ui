import { renderHook } from '@testing-library/react';

import { PrimitivesProvider, usePrimitives } from '../PrimitivesContext';

describe('usePrimitives', () => {
  it('returns the expected values', () => {
    const { result } = renderHook(() => usePrimitives(), {
      wrapper: PrimitivesProvider as React.ComponentType<{
        children?: React.ReactNode;
      }>,
    });

    expect(result.current).toStrictEqual({});
  });
});
