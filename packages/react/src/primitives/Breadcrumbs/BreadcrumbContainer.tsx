import * as React from 'react';
import classNames from 'classnames';
import { ComponentClassName } from '@aws-amplify/ui';

import {
  Primitive,
  ForwardRefPrimitive,
  BreadcrumbsContainerProps,
  BaseBreadcrumbContainerProps,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { View } from '../View';

const BreadcrumbContainerPrimitive: Primitive<
  BreadcrumbsContainerProps,
  'nav'
> = ({ className, children, ...rest }, ref) => {
  const componentClasses = classNames(
    ComponentClassName.Breadcrumbs,
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
      <View as="ol" className={ComponentClassName.BreadcrumbsList}>
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
> = primitiveWithForwardRef(BreadcrumbContainerPrimitive);

BreadcrumbContainer.displayName = 'Breadcrumbs.Container';
