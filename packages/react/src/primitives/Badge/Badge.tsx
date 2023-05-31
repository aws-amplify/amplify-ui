import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { BaseBadgeProps, ForwardRefPrimitive, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { View } from '../View';

const BadgePrimitive: Primitive<BaseBadgeProps, 'span'> = (
  { className, children, variation, size, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.Badge,
    className,
    classNameModifier(ComponentClassNames.Badge, variation),
    classNameModifier(ComponentClassNames.Badge, size)
  );

  return (
    <View
      as="span"
      className={componentClasses}
      data-variation={variation}
      data-size={size}
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/badge)
 */
export const Badge = React.forwardRef(BadgePrimitive) as ForwardRefPrimitive<
  BaseBadgeProps,
  'span'
>;

Badge.displayName = 'Badge';
