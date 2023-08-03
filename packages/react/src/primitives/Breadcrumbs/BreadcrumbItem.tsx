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
import { BreadcrumbsContext } from './BreadcrumbsContext';

const BreadcrumbItemPrimitive: Primitive<BreadcrumbsItemProps, 'li'> = (
  { className, children, isCurrent, ...rest },
  ref
) => {
  const { separator } = React.useContext(BreadcrumbsContext);
  const componentClasses = classNames(
    ComponentClassNames.BreadcrumbsItem,
    classNameModifierByFlag(
      ComponentClassNames.BreadcrumbsItem,
      'current',
      isCurrent
    ),
    className
  );
  const value = React.useMemo(() => {
    return { isCurrent };
  }, [isCurrent]);

  return (
    <View as="li" className={componentClasses} ref={ref} {...rest}>
      <BreadcrumbsContext.Provider value={value}>
        {children}
      </BreadcrumbsContext.Provider>
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
