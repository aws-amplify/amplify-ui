import * as React from 'react';
import { classNames } from '@aws-amplify/ui';
import { NavElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';
import { NextButton } from './NextButton';
import { PreviousButton } from './PreviousButton';
import { CurrentPage } from './CurrentPage';
import { Item } from './Item';

const PaginationControlPrimitive = <T extends NavElementProps>({
  ariaLabel = 'Pagination',
  className,
  children,
  ...rest
}: T): JSX.Element => {
  const Nav = useElement('Nav');

  return (
    <Nav
      {...rest}
      aria-label={ariaLabel}
      className={classNames(
        'amplify-storagebrowser-pagination-control',
        className
      )}
    >
      <ol className={``}>{children}</ol>
    </Nav>
  );
};

const PaginationControl = Object.assign(PaginationControlPrimitive, {
  Item,
  NextButton,
  CurrentPage,
  PreviousButton,
});

export { PaginationControl };
