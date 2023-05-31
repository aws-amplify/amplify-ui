import classNames from 'classnames';
import * as React from 'react';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared';
import { BaseDividerProps, ForwardRefPrimitive, Primitive } from '../types';
import { View } from '../View';

const DividerPrimitive: Primitive<BaseDividerProps, 'hr'> = (
  { className, orientation = 'horizontal', size, label, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.Divider,
    classNameModifier(ComponentClassNames.Divider, orientation),
    classNameModifier(ComponentClassNames.Divider, size),
    label ? ComponentClassNames.DividerLabel : null,
    className
  );

  return (
    <View
      aria-orientation={orientation}
      as="hr"
      className={componentClasses}
      data-size={size}
      data-label={label}
      ref={ref}
      {...rest}
    />
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/divider)
 */
export const Divider = React.forwardRef(
  DividerPrimitive
) as ForwardRefPrimitive<BaseDividerProps, 'hr'>;

Divider.displayName = 'Divider';
