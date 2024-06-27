import * as React from 'react';
import { BreadcrumbsProps } from '../../types';
import { Item } from './Item';
import { Separator } from './Separator';
import { Button } from './Button';

const BreadcrumbsPrimitive = <T extends BreadcrumbsProps>({
  ariaLabel = 'Breadcrumbs',
  children,
  ...rest
}: T): JSX.Element => {
  return (
    <nav {...rest} aria-label={ariaLabel} className={``}>
      <ol className={``}>{children}</ol>
    </nav>
  );
};

const Breadcrumbs = Object.assign(BreadcrumbsPrimitive, {
  Item,
  Separator,
  Button,
});

export { Breadcrumbs };
