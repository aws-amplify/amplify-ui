import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';
import {
  BaseLinkProps,
  LinkProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

import { BiLinkExternal } from 'react-icons/bi';

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
      {isExternal && <BiLinkExternal />}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/link)
 */
export const Link: ForwardRefPrimitive<BaseLinkProps, 'a'> =
  primitiveWithForwardRef(LinkPrimitive);

Link.displayName = 'Link';
