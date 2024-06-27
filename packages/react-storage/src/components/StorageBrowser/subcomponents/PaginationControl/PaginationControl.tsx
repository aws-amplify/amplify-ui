import * as React from 'react';
import { PaginationControlProps } from '../../types';
import { NextButton } from './NextButton';
import { PreviousButton } from './PreviousButton';
import { CurrentPage } from './CurrentPage';
import { Item } from './Item';

const PaginationControlPrimitive = <T extends PaginationControlProps>({
  ariaLabel = 'Pagination',
  children,
  ...rest
}: T): JSX.Element => {
  return (
    <nav {...rest} aria-label={ariaLabel} className={``}>
      <ol className={``}>{children}</ol>
    </nav>
  );
};

const PaginationControl = Object.assign(PaginationControlPrimitive, {
  Item,
  NextButton,
  CurrentPage,
  PreviousButton,
});

export { PaginationControl };
