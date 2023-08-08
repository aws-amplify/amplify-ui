import * as React from 'react';
import classNames from 'classnames';

import {
  BaseBreadcrumbProps,
  BreadcrumbsProps,
  Primitive,
  ForwardRefPrimitive,
} from '../types';
import { ComponentClassNames } from '../shared/constants';
import { View } from '../View';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';
import { BreadcrumbsProvider } from './BreadcrumbsContext';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

const DefaultSeparator = <BreadcrumbSeparator>{'/'}</BreadcrumbSeparator>;

const BreadcrumbsPrimitive: Primitive<BreadcrumbsProps, 'nav'> = (
  { className, children, as = 'nav', separator = DefaultSeparator, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.Breadcrumbs,
    className
  );

  const ariaLabel = rest['aria-label'] ?? 'Breadcrumb';

  return (
    <View
      {...rest}
      as={as}
      aria-label={ariaLabel}
      className={componentClasses}
      ref={ref}
    >
      <View as="ol" className={ComponentClassNames.BreadcrumbsList}>
        <BreadcrumbsProvider separator={separator}>
          {children}
        </BreadcrumbsProvider>
      </View>
    </View>
  );
};

type BreadcrumbsType = ForwardRefPrimitive<BaseBreadcrumbProps, 'nav'> & {
  Link: typeof BreadcrumbLink;
  Item: typeof BreadcrumbItem;
  Separator: typeof BreadcrumbSeparator;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
const Breadcrumbs: BreadcrumbsType = Object.assign(
  React.forwardRef(BreadcrumbsPrimitive),
  {
    Item: BreadcrumbItem,
    Link: BreadcrumbLink,
    Separator: BreadcrumbSeparator,
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
