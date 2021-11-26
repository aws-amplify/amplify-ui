import * as React from 'react';
import classNames from 'classnames';

import { View } from '../View';
import { PrimitiveWithForwardRef, ScrollViewProps } from '../types';
import { ComponentClassNames } from '../shared/constants';

const ScrollViewPrimitive: PrimitiveWithForwardRef<ScrollViewProps, 'div'> = (
  { children, className, orientation, ...rest },
  ref
) => (
  <View
    className={classNames(ComponentClassNames.ScrollView, className)}
    data-orientation={orientation}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const ScrollView = React.forwardRef(ScrollViewPrimitive);

ScrollView.displayName = 'ScrollView';
