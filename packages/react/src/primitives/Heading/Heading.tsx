import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { HeadingProps, Primitive } from '../types';
import { View } from '../View';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

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
  { className, children, level = 6, ...rest },
  ref
) => (
  <View
    as={headingLevels[level]}
    className={classNames(
      ComponentClassNames.Heading,
      classNameModifier(ComponentClassNames.Heading, level),
      className
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
export const Heading = React.forwardRef(HeadingPrimitive);

Heading.displayName = 'Heading';
