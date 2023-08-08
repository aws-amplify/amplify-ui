import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  BreadcrumbsSeparatorProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';

const BreadcrumbSeparatorPrimitive: Primitive<
  BreadcrumbsSeparatorProps,
  'span'
> = ({ className = '/', children, as = 'span', ...rest }, ref) => {
  const ariaHidden = rest['aria-hidden'] ?? 'true';
  return (
    <View
      {...rest}
      as={as}
      ref={ref}
      aria-hidden={ariaHidden}
      className={classNames(
        ComponentClassNames.BreadcrumbsSeparator,
        className
      )}
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
> = React.forwardRef(BreadcrumbSeparatorPrimitive);

BreadcrumbSeparator.displayName = 'Breadcrumbs.Separator';
