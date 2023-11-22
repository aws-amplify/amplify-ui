import * as React from 'react';
import { ComponentClassName, classNames } from '@aws-amplify/ui';
import {
  BaseLinkProps,
  LinkProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { IconBoxArrowUpRight } from '../Icon/icons/IconBoxArrowUpRight';

const LinkPrimitive: Primitive<LinkProps, 'a'> = (
  { as = 'a', children, className, isExternal, ...rest },
  ref
) => {
  return (
    <View
      as={as}
      className={classNames(ComponentClassName.Link, className)}
      ref={ref}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
      {...rest}
    >
      {children}
      {isExternal && <IconBoxArrowUpRight />}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/link)
 */
export const Link: ForwardRefPrimitive<BaseLinkProps, 'a'> =
  primitiveWithForwardRef(LinkPrimitive);

Link.displayName = 'Link';
