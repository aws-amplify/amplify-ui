import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import {
  BaseTextProps,
  TextProps,
  Primitive,
  ForwardRefPrimitive,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const TextPrimitive: Primitive<TextProps, 'p'> = (
  { as = 'p', className, children, isTruncated, variation, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassName.Text,
    classNameModifier(ComponentClassName.Text, variation),
    classNameModifierByFlag(ComponentClassName.Text, 'truncated', isTruncated),
    className
  );

  return (
    <View as={as} className={componentClasses} ref={ref} {...rest}>
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/text)
 */
export const Text: ForwardRefPrimitive<BaseTextProps, 'p'> =
  primitiveWithForwardRef(TextPrimitive);

Text.displayName = 'Text';
