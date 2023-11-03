import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';

import { classNameModifier } from '../shared/utils';
import {
  BadgeProps,
  BaseBadgeProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { View } from '../View';

const BadgePrimitive: Primitive<BadgeProps, 'span'> = (
  { className, children, variation, size, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassName.Badge,
    className,
    classNameModifier(ComponentClassName.Badge, variation),
    classNameModifier(ComponentClassName.Badge, size)
  );

  return (
    <View as="span" className={componentClasses} ref={ref} {...rest}>
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/badge)
 */
export const Badge: ForwardRefPrimitive<BaseBadgeProps, 'span'> =
  primitiveWithForwardRef(BadgePrimitive);

Badge.displayName = 'Badge';
