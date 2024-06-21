import * as React from 'react';
import { breadcrumbsClasses } from '@aws-amplify/ui';

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
  const ariaLabel = rest['aria-label'] ?? 'Breadcrumb';

  return (
    <View
      {...rest}
      as="nav"
      aria-label={ariaLabel}
      className={breadcrumbsClasses(undefined, [className])}
      ref={ref}
    >
      <View as="ol" className={breadcrumbsClasses({ _element: 'list' })}>
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
