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
import { classNameModifier } from '@aws-amplify/ui';

const LinkPrimitive: Primitive<LinkProps, 'a'> = (
  {
    as = 'a',
    children,
    className,
    isExternal,
    linkIconPosition,
    hideIcon = false,
    ...rest
  },
  ref
) => {
  const shouldDisplayIcon = isExternal && !hideIcon;

  return (
    <View
      as={as}
      className={classNames(ComponentClassName.Link, className)}
      ref={ref}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
      {...rest}
    >
      {linkIconPosition !== 'left' && children}
      {shouldDisplayIcon && (
        <IconBoxArrowUpRight
          className={classNameModifier(ComponentClassName.Link, 'link-icon')}
        />
      )}
      {linkIconPosition === 'left' && children}
    </View>
  );
};

/**
 * [:book: Docs](https://ui.docs.amplify.aws/react/components/link)
 */

export const Link: ForwardRefPrimitive<BaseLinkProps, 'a'> =
  primitiveWithForwardRef(LinkPrimitive);

Link.displayName = 'Link';
