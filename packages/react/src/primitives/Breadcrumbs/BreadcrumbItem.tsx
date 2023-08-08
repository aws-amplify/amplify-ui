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
      {/* Don't show separator if item isCurrent */}
      {isCurrent ? null : separator}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
export const BreadcrumbItem: ForwardRefPrimitive<
  BaseBreadcrumbItemProps,
  'span'
> = React.forwardRef(BreadcrumbItemPrimitive);

BreadcrumbItem.displayName = 'Breadcrumbs.Item';
