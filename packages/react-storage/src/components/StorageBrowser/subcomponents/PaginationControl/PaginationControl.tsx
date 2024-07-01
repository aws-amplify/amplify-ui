import * as React from 'react';
import { NavElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';
import { NextButton } from './NextButton';
import { PreviousButton } from './PreviousButton';
import { CurrentPage } from './CurrentPage';
import { Item } from './Item';
import { List } from './List';

const PaginationControlPrimitive = <T extends NavElementProps>({
  ariaLabel = 'Pagination',
  className: _className,
  children,
  ...rest
}: T): JSX.Element => {
  const Nav = useElement('Nav');
  const baseClassName = 'storage-browser-pagination-control';
  const className = _className ?? baseClassName;

  return (
    <Nav {...rest} aria-label={ariaLabel} className={className}>
      {children}
    </Nav>
  );
};

const PaginationControl = Object.assign(PaginationControlPrimitive, {
  Item,
  List,
  NextButton,
  CurrentPage,
  PreviousButton,
});

export { PaginationControl };
