import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';

import { classNameModifierByFlag } from '../shared/utils';
import {
  BreadcrumbsLinkProps,
  ForwardRefPrimitive,
  Primitive,
  BaseBreadcrumbLinkProps,
} from '../types';

import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

import { Link } from '../Link';
import { Text } from '../Text';

const BreadcrumbLinkPrimitive: Primitive<BreadcrumbsLinkProps, 'a'> = (
  { className, children, href, isCurrent, isDisabled, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassName.BreadcrumbsLink,
    classNameModifierByFlag(
      ComponentClassName.BreadcrumbsLink,
      'current',
      isCurrent
    ),
    classNameModifierByFlag(
      ComponentClassName.BreadcrumbsLink,
      'disabled',
      isDisabled
    ),
    className
  );

  if (isCurrent) {
    const ariaCurrent = rest['aria-current'] ?? 'page';
    const as = rest.as ?? 'span';

    return (
      <Text
        {...rest}
        as={as}
        aria-current={ariaCurrent}
        className={componentClasses}
        ref={ref}
      >
        {children}
      </Text>
    );
  } else {
    return (
      <Link
        {...rest}
        className={componentClasses}
        href={href}
        isDisabled={isDisabled}
        ref={ref}
      >
        {children}
      </Link>
    );
  }
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
export const BreadcrumbLink: ForwardRefPrimitive<BaseBreadcrumbLinkProps, 'a'> =
  primitiveWithForwardRef(BreadcrumbLinkPrimitive);

BreadcrumbLink.displayName = 'Breadcrumbs.Link';
