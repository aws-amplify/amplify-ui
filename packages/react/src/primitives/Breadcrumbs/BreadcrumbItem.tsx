import * as React from 'react';
import classNames from 'classnames';

import { classNameModifierByFlag } from '../shared/utils';
import {
  BreadcrumbItemProps,
  ForwardRefPrimitive,
  Primitive,
  BaseBreadcrumbItemProps,
} from '../types';
import { ComponentClassNames } from '../shared/constants';
import { View } from '../View';

const BreadcrumbItemPrimitive: Primitive<BreadcrumbItemProps, 'li'> = (
  { className, children, isCurrent, isDisabled, separator, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.BreadcrumbItem,
    classNameModifierByFlag(
      ComponentClassNames.BreadcrumbItem,
      'current',
      isCurrent
    ),
    classNameModifierByFlag(
      ComponentClassNames.BreadcrumbItem,
      'disabled',
      isDisabled
    ),
    className
  );

  return (
    <View as="li" className={componentClasses} ref={ref} {...rest}>
      {children}
      {isCurrent ? null : (
        <span className="" aria-hidden="true">
          {separator}
        </span>
      )}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
export const BreadcrumbItem: ForwardRefPrimitive<
  BaseBreadcrumbItemProps,
  'nav'
> = React.forwardRef(BreadcrumbItemPrimitive);

BreadcrumbItem.displayName = 'BreadcrumbItem';
