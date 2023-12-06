import * as React from 'react';

import {
  BaseViewProps,
  ElementType,
  ForwardRefPrimitive,
  Primitive,
} from '../types';

/**
 * Updates the return type for primitives wrapped in `React.forwardRef` to
 * `React.ReactElement`. In React 18 the return type of `React.ExoticComponent`
 * was changed from `React.ReactElement` to `React.ReactNode`, which breaks
 * clients using React 16 and 17.
 *
 * @param primitive UI Primitive to be wrapped with `React.forwardRef`
 * @returns ForwaredRef wrapped UI Primitive
 */
export const primitiveWithForwardRef = <
  P extends BaseViewProps,
  E extends ElementType,
>(
  primitive: Primitive<P, E>
): ForwardRefPrimitive<P, E> =>
  React.forwardRef(primitive) as ForwardRefPrimitive<P, E>;
