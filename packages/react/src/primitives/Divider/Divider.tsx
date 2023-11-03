import classNames from 'classnames';
import * as React from 'react';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
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
  const componentClasses = classNames(
    ComponentClassName.Divider,
    classNameModifier(ComponentClassName.Divider, orientation),
    classNameModifier(ComponentClassName.Divider, size),
    className
  );

  return (
    <View
      aria-orientation={orientation}
      as="hr"
      className={componentClasses}
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
