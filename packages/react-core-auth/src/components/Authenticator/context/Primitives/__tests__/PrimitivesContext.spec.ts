import { renderHook } from '@testing-library/react-hooks';

import { PrimitivesProvider, usePrimitives } from '../PrimitivesContext';

describe('usePrimitives', () => {
  it('returns the expected values', () => {
    const { result } = renderHook(() => usePrimitives(), {
      wrapper: PrimitivesProvider,
    });

    expect(result.current).toStrictEqual({});
  });
});
