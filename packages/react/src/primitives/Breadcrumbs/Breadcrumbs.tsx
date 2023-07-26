import * as React from 'react';
import classNames from 'classnames';

import { BreadcrumbProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { View } from '../View';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';

const DefaultBreadcrumbSeparator = () => {
  return (
    <View as="span" className={ComponentClassNames.BreadcrumbSeparator}>
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
      <View as="ol">
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

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
const Breadcrumbs = Object.assign(React.forwardRef(BreadcrumbsPrimitive), {
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
});

Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
