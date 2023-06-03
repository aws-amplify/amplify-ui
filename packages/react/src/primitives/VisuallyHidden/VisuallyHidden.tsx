import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseVisuallyHiddenProps,
  VisuallyHiddenProps,
} from '../types';
import { View } from '../View';

const VisuallyHiddenPrimitive: Primitive<VisuallyHiddenProps, 'span'> = (
  { as = 'span', children, className, ...rest },
  ref
) => (
  <View
    as={as}
    className={classNames(ComponentClassNames.VisuallyHidden, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/visuallyhidden)
 */
export const VisuallyHidden: ForwardRefPrimitive<
  BaseVisuallyHiddenProps,
  'span'
> = React.forwardRef(VisuallyHiddenPrimitive);

VisuallyHidden.displayName = 'VisuallyHidden';
