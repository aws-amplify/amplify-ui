import * as React from 'react';
import { headingClasses } from '@aws-amplify/ui';

import {
  ForwardRefPrimitive,
  BaseHeadingProps,
  HeadingProps,
  HeadingTag,
  Primitive,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

interface HeadingLevels {
  [key: number]: HeadingTag;
}

const headingLevels: HeadingLevels = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

const HeadingPrimitive: Primitive<HeadingProps, HeadingTag> = (
  { className, children, isTruncated, level = 6, ...rest },
  ref
) => (
  <View
    as={headingLevels[level]}
    className={headingClasses(
      {
        _modifiers: {
          truncated: isTruncated,
          [String(level)]: true,
        },
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
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/heading)
 */
export const Heading: ForwardRefPrimitive<BaseHeadingProps, HeadingTag> =
  primitiveWithForwardRef(HeadingPrimitive);

Heading.displayName = 'Heading';
