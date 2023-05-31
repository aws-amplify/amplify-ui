import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { LinkProps, ForwardRefPrimitive, Primitive } from '../types';
import { View } from '../View';

const LinkPrimitive: Primitive<LinkProps, 'a'> = (
  { as = 'a', children, className, isExternal, ...rest },
  ref
) => {
  return (
    <View
      as={as}
      className={classNames(ComponentClassNames.Link, className)}
      ref={ref}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
      {...rest}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/link)
 */
export const Link = React.forwardRef(LinkPrimitive) as ForwardRefPrimitive<
  LinkProps,
  'a'
>;

Link.displayName = 'Link';
