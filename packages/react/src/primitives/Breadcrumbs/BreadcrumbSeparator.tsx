import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';

import {
  BreadcrumbsSeparatorProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { View } from '../View';

const BreadcrumbSeparatorPrimitive: Primitive<
  BreadcrumbsSeparatorProps,
  'span'
> = ({ className, children = '/', as = 'span', ...rest }, ref) => {
  const ariaHidden = rest['aria-hidden'] ?? 'true';
  return (
    <View
      {...rest}
      as={as}
      ref={ref}
      aria-hidden={ariaHidden}
      className={classNames(ComponentClassName.BreadcrumbsSeparator, className)}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
export const BreadcrumbSeparator: ForwardRefPrimitive<
  BreadcrumbsSeparatorProps,
  'span'
> = primitiveWithForwardRef(BreadcrumbSeparatorPrimitive);

BreadcrumbSeparator.displayName = 'Breadcrumbs.Separator';
