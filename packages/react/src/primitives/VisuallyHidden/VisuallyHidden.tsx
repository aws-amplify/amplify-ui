import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { PrimitiveWithForwardRef, VisuallyHiddenProps } from '../types';
import { View } from '../View';

const VisuallyHiddenPrimitive: PrimitiveWithForwardRef<
  VisuallyHiddenProps,
  'span'
> = ({ as = 'span', children, className, ...rest }, ref) => (
  <View
    as={as}
    className={classNames(ComponentClassNames.VisuallyHidden, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const VisuallyHidden = React.forwardRef(VisuallyHiddenPrimitive);

VisuallyHidden.displayName = 'VisuallyHidden';
