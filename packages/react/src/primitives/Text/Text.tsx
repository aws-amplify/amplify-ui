import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { TextProps, Primitive } from '../types';
import { View } from '../View';

const TextPrimitive: Primitive<TextProps, 'p'> = (
  { as = 'p', className, children, isTruncated, variation, ...rest },
  ref
) => {
  return (
    <View
      as={as}
      className={classNames(
        ComponentClassNames.Text,
        classNameModifier(ComponentClassNames.Text, variation),
        classNameModifier(ComponentClassNames.Text, 'truncated', isTruncated),
        className
      )}
      data-truncate={isTruncated}
      data-variation={variation}
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

export const Text = React.forwardRef(TextPrimitive);

Text.displayName = 'Text';
