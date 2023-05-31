import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseVisuallyHiddenProps,
} from '../types';
import { View } from '../View';

const VisuallyHiddenPrimitive: Primitive<BaseVisuallyHiddenProps, 'span'> = (
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
export const VisuallyHidden = React.forwardRef(
  VisuallyHiddenPrimitive
) as ForwardRefPrimitive<BaseVisuallyHiddenProps, 'span'>;

VisuallyHidden.displayName = 'VisuallyHidden';
