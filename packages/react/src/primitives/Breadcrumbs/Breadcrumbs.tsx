import * as React from 'react';

import {
  BaseBreadcrumbProps,
  BreadcrumbsProps,
  Primitive,
  ForwardRefPrimitive,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';
import { BreadcrumbContainer } from './BreadcrumbContainer';

const BreadcrumbsPrimitive: Primitive<BreadcrumbsProps, 'nav'> = (
  { className, items, separator = <BreadcrumbSeparator />, ...rest },
  ref
) => {
  const ariaLabel = rest['aria-label'] ?? 'Breadcrumb';

  return (
    <BreadcrumbContainer
      {...rest}
      aria-label={ariaLabel}
      className={className}
      ref={ref}
    >
      {items?.map(({ href, label }, idx) => {
        const isCurrent = items.length - 1 === idx;
        return (
          <BreadcrumbItem key={`${href}${idx}`}>
            <BreadcrumbLink href={href} isCurrent={isCurrent}>
              {label}
            </BreadcrumbLink>
            {/* Don't show separator if item isCurrent */}
            {isCurrent ? null : separator}
          </BreadcrumbItem>
        );
      })}
    </BreadcrumbContainer>
  );
};

type BreadcrumbsType = ForwardRefPrimitive<BaseBreadcrumbProps, 'nav'> & {
  Link: typeof BreadcrumbLink;
  Item: typeof BreadcrumbItem;
  Separator: typeof BreadcrumbSeparator;
  Container: typeof BreadcrumbContainer;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/breadcrumbs)
 */
const Breadcrumbs: BreadcrumbsType = Object.assign(
  primitiveWithForwardRef(BreadcrumbsPrimitive),
  {
    Item: BreadcrumbItem,
    Link: BreadcrumbLink,
    Separator: BreadcrumbSeparator,
    Container: BreadcrumbContainer,
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
