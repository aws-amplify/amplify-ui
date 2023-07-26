import * as React from 'react';
import classNames from 'classnames';

import { classNameModifierByFlag } from '../shared/utils';
import {
  BreadcrumbLinkProps,
  ForwardRefPrimitive,
  Primitive,
  BaseBreadcrumbLinkProps,
} from '../types';
import { ComponentClassNames } from '../shared/constants';
import { Link } from '../Link';

const BreadcrumbLinkPrimitive: Primitive<BreadcrumbLinkProps, 'span'> = (
  { className, children, href, isCurrent, isDisabled, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.BreadcrumbLink,
    classNameModifierByFlag(
      ComponentClassNames.BreadcrumbLink,
      'current',
      isCurrent
    ),
    classNameModifierByFlag(
      ComponentClassNames.BreadcrumbLink,
      'disabled',
      isDisabled
    ),
    className
  );

  const linkProps = {
    ...(isCurrent
      ? {
          'aria-current': 'page',
          'aria-disabled': 'true',
        }
      : null),
    ...(isDisabled
      ? {
          'aria-disabled': 'true',
        }
      : null),
  };

  return (
    <Link
      className={componentClasses}
      ref={ref}
      href={href}
      {...linkProps}
      {...rest}
    >
      {children}
    </Link>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
export const BreadcrumbLink: ForwardRefPrimitive<BaseBreadcrumbLinkProps, 'a'> =
  React.forwardRef(BreadcrumbLinkPrimitive);

BreadcrumbLink.displayName = 'BreadcrumbLink';
