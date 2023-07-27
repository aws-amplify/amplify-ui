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
import { BreadcrumbsContext } from './BreadcrumbsContext';

const DefaultBreadcrumbSeparator = () => {
  return (
    <View as="span" className={ComponentClassNames.BreadcrumbsSeparator}>
      /
    </View>
  );
};

const BreadcrumbsPrimitive: Primitive<BreadcrumbProps, 'nav'> = (
  { className, children, separator, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.Breadcrumbs,
    className
  );
  const value = React.useMemo(() => {
    return {
      separator: separator ?? <DefaultBreadcrumbSeparator />,
    };
  }, [separator]);

  return (
    <View
      as="nav"
      aria-label="Breadcrumb"
      className={componentClasses}
      ref={ref}
      {...rest}
    >
      <View as="ol" className={ComponentClassNames.BreadcrumbsList}>
        <BreadcrumbsContext.Provider value={value}>
          {children}
        </BreadcrumbsContext.Provider>
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
