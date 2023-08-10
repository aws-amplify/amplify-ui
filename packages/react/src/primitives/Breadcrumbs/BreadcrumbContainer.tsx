import * as React from 'react';
import classNames from 'classnames';

import {
  Primitive,
  ForwardRefPrimitive,
  BreadcrumbsContainerProps,
  BaseBreadcrumbContainerProps,
} from '../types';
import { ComponentClassNames } from '../shared/constants';
import { View } from '../View';

const BreadcrumbContainerPrimitive: Primitive<
  BreadcrumbsContainerProps,
  'nav'
> = ({ className, children, ...rest }, ref) => {
  const componentClasses = classNames(
    ComponentClassNames.Breadcrumbs,
    className
  );

  const ariaLabel = rest['aria-label'] ?? 'Breadcrumb';

  return (
    <View
      {...rest}
      as="nav"
      aria-label={ariaLabel}
      className={componentClasses}
      ref={ref}
    >
      <View as="ol" className={ComponentClassNames.BreadcrumbsList}>
        {children}
      </View>
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
export const BreadcrumbContainer: ForwardRefPrimitive<
  BaseBreadcrumbContainerProps,
  'nav'
> = React.forwardRef(BreadcrumbContainerPrimitive);

BreadcrumbContainer.displayName = 'Breadcrumbs.Container';
