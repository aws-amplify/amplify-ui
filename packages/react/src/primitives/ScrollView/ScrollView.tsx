import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseScrollViewProps,
  ScrollViewProps,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const ScrollViewPrimitive: Primitive<ScrollViewProps, 'div'> = (
  { children, className, orientation, ...rest },
  ref
) => (
  <View
    className={classNames(
      ComponentClassName.ScrollView,
      classNameModifier(ComponentClassName.ScrollView, orientation),
      className
    )}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/scrollview)
 */
export const ScrollView: ForwardRefPrimitive<BaseScrollViewProps, 'div'> =
  primitiveWithForwardRef(ScrollViewPrimitive);

ScrollView.displayName = 'ScrollView';
