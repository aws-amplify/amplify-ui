import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { Primitive, ScrollViewProps } from '../types';
import { View } from '../View';

const ScrollViewPrimitive: Primitive<ScrollViewProps, 'div'> = (
  { children, className, orientation, ...rest },
  ref
) => (
  <View
    className={classNames(
      ComponentClassNames.ScrollView,
      `${ComponentClassNames.ScrollView}--orientation-${orientation}`,
      className
    )}
    data-orientation={orientation}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const ScrollView = React.forwardRef(ScrollViewPrimitive);

ScrollView.displayName = 'ScrollView';
