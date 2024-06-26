import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import createPrimitivesContext from '../createPrimitivesContext';
import { PrimitiveButton, PrimitiveView } from '../defaultPrimitives';

const primitives = { Button: PrimitiveButton, View: PrimitiveView };

describe('createPrimitivesContext', () => {
  it('usePrimitive exposes the expected primitives', () => {
    const { usePrimitive } = createPrimitivesContext(primitives);

    const {
      result: { current: Button },
    } = renderHook(() => usePrimitive('Button'));
    const {
      result: { current: View },
    } = renderHook(() => usePrimitive('View'));

    expect(Button).toBe(PrimitiveButton);
    expect(View).toBe(View);
  });

  it('Passing `primitives` PrimitivesProvider overrides the default `primitives`', () => {
    const { PrimitivesProvider, usePrimitive } =
      createPrimitivesContext(primitives);

    const OtherButton = () => <>Hi</>;
    const OtherView = () => <>Hi</>;
    const wrapper = (props: { children?: React.ReactNode }) => (
      <PrimitivesProvider
        primitives={{ Button: OtherButton, View: OtherView }}
        {...props}
      />
    );

    const {
      result: { current: Button },
    } = renderHook(() => usePrimitive('Button'), { wrapper });
    const {
      result: { current: View },
    } = renderHook(() => usePrimitive('View'), { wrapper });

    expect(Button).not.toBe(PrimitiveButton);
    expect(Button).toBe(OtherButton);

    expect(View).not.toBe(PrimitiveView);
    expect(View).toBe(OtherView);
  });
});
