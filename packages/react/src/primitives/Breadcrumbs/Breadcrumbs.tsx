import * as React from 'react';
import classNames from 'classnames';

import {
  BaseBreadcrumbProps,
  BreadcrumbProps,
  Primitive,
  ForwardRefPrimitive,
} from '../types';
import { ComponentClassNames } from '../shared/constants';
import { View } from '../View';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';

const DefaultBreadcrumbSeparator = () => {
  return (
    <View as="span" className={ComponentClassNames.BreadcrumbsSeparator}>
      /
    </View>
  );
};

const BreadcrumbsPrimitive: Primitive<BreadcrumbProps, 'span'> = (
  { className, children, separator = <DefaultBreadcrumbSeparator />, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.Breadcrumbs,
    className
  );

  const childCount = React.Children.count(children);
  const validChildren = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];

  return (
    <View
      as="nav"
      aria-label="Breadcrumb"
      className={componentClasses}
      ref={ref}
      {...rest}
    >
      <View as="ol" className={ComponentClassNames.BreadcrumbsList}>
        {React.Children.map(validChildren, (child, i) =>
          React.cloneElement(child, {
            isCurrent: i === childCount - 1,
            separator,
          })
        )}
      </View>
    </View>
  );
};

type BreadcrumbsType = ForwardRefPrimitive<BaseBreadcrumbProps, 'nav'> & {
  Link: typeof BreadcrumbLink;
  Item: typeof BreadcrumbItem;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
const Breadcrumbs: BreadcrumbsType = Object.assign(
  React.forwardRef(BreadcrumbsPrimitive),
  {
    Item: BreadcrumbItem,
    Link: BreadcrumbLink,
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
