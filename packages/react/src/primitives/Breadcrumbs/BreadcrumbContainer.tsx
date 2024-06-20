import * as React from 'react';
import { createComponentClasses } from '@aws-amplify/ui';

import {
  Primitive,
  ForwardRefPrimitive,
  BreadcrumbsContainerProps,
  BaseBreadcrumbContainerProps,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { View } from '../View';

const breadcrumbsClassnames = createComponentClasses({ name: 'breadcrumbs' });

const BreadcrumbContainerPrimitive: Primitive<
  BreadcrumbsContainerProps,
  'nav'
> = ({ className, children, ...rest }, ref) => {
  const ariaLabel = rest['aria-label'] ?? 'Breadcrumb';

  return (
    <View
      {...rest}
      as="nav"
      aria-label={ariaLabel}
      className={breadcrumbsClassnames(undefined, [className])}
      ref={ref}
    >
      <View as="ol" className={breadcrumbsClassnames({ _element: 'list' })}>
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
