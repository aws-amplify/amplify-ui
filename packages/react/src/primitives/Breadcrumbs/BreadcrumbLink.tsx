import * as React from 'react';
import classNames from 'classnames';

import { classNameModifierByFlag } from '../shared/utils';
import {
  BreadcrumbsLinkProps,
  ForwardRefPrimitive,
  Primitive,
  BaseBreadcrumbLinkProps,
} from '../types';
import { ComponentClassNames } from '../shared/constants';
import { Link } from '../Link';
import { BreadcrumbsContext } from './BreadcrumbsContext';

const BreadcrumbLinkPrimitive: Primitive<BreadcrumbsLinkProps, 'span'> = (
  { className, children, href, ...rest },
  ref
) => {
  const { isCurrent, isDisabled } = React.useContext(BreadcrumbsContext);
  const componentClasses = classNames(
    ComponentClassNames.BreadcrumbsLink,
    classNameModifierByFlag(
      ComponentClassNames.BreadcrumbsLink,
      'current',
      isCurrent
    ),
    classNameModifierByFlag(
      ComponentClassNames.BreadcrumbsLink,
      'disabled',
      isDisabled
    ),
    className
  );

  const linkProps = {
    'aria-current': isCurrent ? 'page' : undefined,
    'aria-disabled': isDisabled ? 'true' : undefined,
    as: isCurrent ? 'span' : 'a',
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
