import * as React from 'react';
import { dividerClasses } from '@aws-amplify/ui';

import {
  BaseDividerProps,
  DividerProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { View } from '../View';

const DividerPrimitive: Primitive<DividerProps, 'hr'> = (
  { className, orientation = 'horizontal', size, label, ...rest },
  ref
) => {
  return (
    <View
      aria-orientation={orientation}
      as="hr"
      className={dividerClasses(
        {
          _modifiers: [orientation, size],
        },
        [className]
      )}
      data-label={label}
      ref={ref}
      {...rest}
    />
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/divider)
 */
export const Divider: ForwardRefPrimitive<BaseDividerProps, 'hr'> =
  primitiveWithForwardRef(DividerPrimitive);

Divider.displayName = 'Divider';
