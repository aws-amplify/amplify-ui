import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { BaseFlexProps, ForwardRefPrimitive, Primitive } from '../types';
import { View } from '../View';

const FlexPrimitive: Primitive<BaseFlexProps, 'div'> = (
  { className, children, ...rest },
  ref
) => (
  <View
    className={classNames(ComponentClassNames.Flex, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/flex)
 */
export const Flex = React.forwardRef(FlexPrimitive) as ForwardRefPrimitive<
  BaseFlexProps,
  'div'
>;

Flex.displayName = 'Flex';
