import React from 'react';
import { CLASS_BASE } from '../views/constants';
import {
  ButtonElementProps,
  IconElement,
  NavElement,
  SpanElement,
} from '../context/elements';
import { OrderedButtonsList } from '../components/OrderedButtonsList';

export interface PaginationProps {
  currentPage: number;
  disableNext: boolean;
  disablePrevious: boolean;
  handlePaginateNext: () => void;
  handlePaginatePrevious: () => void;
}

const BLOCK_NAME = `${CLASS_BASE}__paginate`;

export const Pagination = ({
  currentPage,
  handlePaginateNext,
  handlePaginatePrevious,
  disableNext,
  disablePrevious,
}: PaginationProps): React.JSX.Element | null => {
  const buttonList: ButtonElementProps[] = [
    {
      'aria-label': 'Go to previous page',
      children: (
        <IconElement
          variant="paginate-previous"
          className={`${BLOCK_NAME}__icon`}
        />
      ),
      className: `${BLOCK_NAME}__button-previous`,
      disabled: disablePrevious,
      onClick: handlePaginatePrevious,
    },
    {
      'aria-current': 'page',
      'aria-label': `${currentPage}`,
      children: (
        <SpanElement className={`${BLOCK_NAME}__text`}>
          {currentPage}
        </SpanElement>
      ),
      className: `${BLOCK_NAME}__button-current`,
    },
    {
      'aria-label': 'Go to next page',
      children: (
        <IconElement
          variant="paginate-next"
          className={`${BLOCK_NAME}__icon`}
        />
      ),
      className: `${BLOCK_NAME}__button-next`,
      disabled: disableNext,
      onClick: handlePaginateNext,
    },
  ];

  return (
    <NavElement aria-label={'Pagination'} className={BLOCK_NAME}>
      <OrderedButtonsList buttonList={buttonList} />
    </NavElement>
  );
};
