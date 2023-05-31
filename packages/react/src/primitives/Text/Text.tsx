import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { BaseTextProps, Primitive, ForwardRefPrimitive } from '../types';
import { View } from '../View';

const TextPrimitive: Primitive<BaseTextProps, 'p'> = (
  { as = 'p', className, children, isTruncated, variation, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.Text,
    classNameModifier(ComponentClassNames.Text, variation),
    classNameModifierByFlag(ComponentClassNames.Text, 'truncated', isTruncated),
    className
  );

  return (
    <View
      as={as}
      className={componentClasses}
      data-truncate={isTruncated}
      data-variation={variation}
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/text)
 */
export const Text = React.forwardRef(TextPrimitive) as ForwardRefPrimitive<
  BaseTextProps,
  'p'
>;

Text.displayName = 'Text';
