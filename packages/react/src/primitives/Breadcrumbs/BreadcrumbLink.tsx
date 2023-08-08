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
import { Text } from '../Text';
import { BreadcrumbsContext } from './BreadcrumbsContext';

const BreadcrumbLinkPrimitive: Primitive<BreadcrumbsLinkProps, 'a'> = (
  { className, children, href, ...rest },
  ref
) => {
  const { isCurrent } = React.useContext(BreadcrumbsContext);
  const componentClasses = classNames(
    ComponentClassNames.BreadcrumbsLink,
    classNameModifierByFlag(
      ComponentClassNames.BreadcrumbsLink,
      'current',
      isCurrent
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
      <Link {...rest} className={componentClasses} ref={ref} href={href}>
        {children}
      </Link>
    );
  }
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
export const BreadcrumbLink: ForwardRefPrimitive<BaseBreadcrumbLinkProps, 'a'> =
  React.forwardRef(BreadcrumbLinkPrimitive);

BreadcrumbLink.displayName = 'Breadcrumbs.Link';
