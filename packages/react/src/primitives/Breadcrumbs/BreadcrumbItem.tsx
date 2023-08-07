import * as React from 'react';
import classNames from 'classnames';

import { classNameModifierByFlag } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import {
  BaseBreadcrumbItemProps,
  BreadcrumbsItemProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';
import {
  BreadcrumbsProvider,
  useBreadcrumbsContext,
} from './BreadcrumbsContext';

const BreadcrumbItemPrimitive: Primitive<BreadcrumbsItemProps, 'li'> = (
  { className, children, isCurrent, as = 'li', ...rest },
  ref
) => {
  const { separator } = useBreadcrumbsContext();
  const componentClasses = classNames(
    ComponentClassNames.BreadcrumbsItem,
    classNameModifierByFlag(
      ComponentClassNames.BreadcrumbsItem,
      'current',
      isCurrent
    ),
    className
  );

  return (
    <View {...rest} as={as} className={componentClasses} ref={ref}>
      <BreadcrumbsProvider isCurrent={isCurrent}>
        {children}
      </BreadcrumbsProvider>
      {isCurrent ? null : (
        <View
          as="span"
          aria-hidden="true"
          className={ComponentClassNames.BreadcrumbsSeparator}
        >
          {separator}
        </View>
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
