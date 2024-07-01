import * as React from 'react';
import { NavElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';
import { Breadcrumb } from './Breadcrumb';
import { Item } from './Item';
import { List } from './List';
import { Separator } from './Separator';

const BreadcrumbsControlPrimitive = <T extends NavElementProps>({
  ariaLabel = 'Breadcrumbs',
  className: _className,
  children,
  ...rest
}: T): JSX.Element => {
  const Nav = useElement('Nav');
  const baseClassName = 'storage-browser-breadcrumbs-control';
  const className = _className ?? baseClassName;

  return (
    <Nav {...rest} aria-label={ariaLabel} className={className}>
      {children}
    </Nav>
  );
};

const BreadcrumbsControl = Object.assign(BreadcrumbsControlPrimitive, {
  Breadcrumb,
  Item,
  List,
  Separator,
});

export { BreadcrumbsControl };
