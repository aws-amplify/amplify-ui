import * as React from 'react';
import { scrollviewClasses } from '@aws-amplify/ui';

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
    className={scrollviewClasses(
      {
        _modifiers: [orientation],
      },
      [className]
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
