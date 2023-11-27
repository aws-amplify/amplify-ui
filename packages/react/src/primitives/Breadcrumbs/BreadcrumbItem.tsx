import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName, classNameModifierByFlag } from '@aws-amplify/ui';

import {
  BaseBreadcrumbItemProps,
  BreadcrumbsItemProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';

import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { View } from '../View';

const BreadcrumbItemPrimitive: Primitive<BreadcrumbsItemProps, 'li'> = (
  { className, children, as = 'li', isDisabled, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassName.BreadcrumbsItem,
    classNameModifierByFlag(
      ComponentClassName.BreadcrumbsItem,
      'disabled',
      isDisabled
    ),
    className
  );

  return (
    <View
      {...rest}
      as={as}
      className={componentClasses}
      isDisabled={isDisabled}
      ref={ref}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
export const BreadcrumbItem: ForwardRefPrimitive<
  BaseBreadcrumbItemProps,
  'li'
> = primitiveWithForwardRef(BreadcrumbItemPrimitive);

BreadcrumbItem.displayName = 'Breadcrumbs.Item';
