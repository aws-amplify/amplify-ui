import React from 'react';
import { CLASS_BASE } from '../views/constants';
import {
  ListItemElement,
  NavElement,
  OrderedListElement,
  SpanElement,
} from '../context/elements';
import { PaginateArrow } from '../components/PaginateArrow';

export interface PaginationProps {
  currentPage: number;
  hasMorePages: boolean;
  handlePaginate: (page: number) => void;
  highestPageVisited: number;
}

const BLOCK_NAME = `${CLASS_BASE}__paginate`;

export const Pagination = ({
  currentPage,
  hasMorePages,
  handlePaginate,
  highestPageVisited,
}: PaginationProps): React.JSX.Element | null => {
  return (
    <NavElement aria-label={'Pagination'} className={BLOCK_NAME}>
      <OrderedListElement className={`${BLOCK_NAME}__list`}>
        <ListItemElement className={`${BLOCK_NAME}__item`}>
          <PaginateArrow
            disabled={currentPage <= 1}
            onClick={() => handlePaginate(currentPage - 1)}
            type="previous"
          />
        </ListItemElement>
        <ListItemElement className={`${BLOCK_NAME}__item`}>
          <SpanElement aria-current="page" className={`${BLOCK_NAME}__text`}>
            {currentPage}
          </SpanElement>
        </ListItemElement>
        <ListItemElement className={`${BLOCK_NAME}__item`}>
          <PaginateArrow
            disabled={currentPage >= highestPageVisited && !hasMorePages}
            onClick={() => handlePaginate(currentPage + 1)}
            type="next"
          />
        </ListItemElement>
      </OrderedListElement>
    </NavElement>
  );
};
