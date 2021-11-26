import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { TextProps, PrimitiveWithForwardRef } from '../types';
import { View } from '../View';

const TextPrimitive: PrimitiveWithForwardRef<TextProps, 'p'> = (
  { as = 'p', className, children, isTruncated, variation, ...rest },
  ref
) => (
  <View
    as={as}
    className={classNames(ComponentClassNames.Text, className)}
    data-truncate={isTruncated}
    data-variation={variation}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const Text = React.forwardRef(TextPrimitive);

Text.displayName = 'Text';
