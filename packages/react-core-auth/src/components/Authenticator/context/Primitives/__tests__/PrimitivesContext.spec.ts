import { renderHook } from '@testing-library/react';

import { PrimitivesProvider, usePrimitives } from '../PrimitivesContext';

describe('usePrimitives', () => {
  it('returns the expected values', () => {
    const { result } = renderHook(() => usePrimitives(), {
      wrapper: PrimitivesProvider,
    });

    expect(result.current).toStrictEqual({});
  });
});
