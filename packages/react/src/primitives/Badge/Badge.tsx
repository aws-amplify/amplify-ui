import * as React from 'react';
import { badgeClasses } from '@aws-amplify/ui';

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
  return (
    <View
      as="span"
      className={badgeClasses({ _modifiers: [variation, size] }, [className])}
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
export const Badge: ForwardRefPrimitive<BaseBadgeProps, 'span'> =
  primitiveWithForwardRef(BadgePrimitive);

Badge.displayName = 'Badge';
