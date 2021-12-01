import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { LinkProps, Primitive } from '../types';
import { View } from '../View';

const LinkPrimitive: Primitive<LinkProps, 'a'> = (
  { as = 'a', children, className, isExternal, ...rest },
  ref
) => {
  return (
    <View
      as={as}
      className={classNames(ComponentClassNames.Link, className)}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

export const Link = React.forwardRef(LinkPrimitive);

Link.displayName = 'Link';
