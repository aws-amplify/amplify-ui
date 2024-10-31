import React from 'react';
import { CLASS_BASE } from '../views/constants';
import {
  ListItemElement,
  NavElement,
  OrderedListElement,
  SpanElement,
} from '../context/elements';
import { PaginateButton } from '../components/PaginateButton';

export interface PaginationProps {
  page: number;
  hasMorePages: boolean;
  onPaginate: (page: number) => void;
  highestPageVisited: number;
}

const BLOCK_NAME = `${CLASS_BASE}__paginate`;

export const Pagination = ({
  page,
  hasMorePages,
  onPaginate,
  highestPageVisited,
}: PaginationProps): React.JSX.Element | null => {
  return (
    <NavElement aria-label={'Pagination'} className={BLOCK_NAME}>
      <OrderedListElement className={`${BLOCK_NAME}__list`}>
        <ListItemElement className={`${BLOCK_NAME}__item`}>
          <PaginateButton
            disabled={page <= 1}
            onClick={() => onPaginate(page - 1)}
            type="previous"
          />
        </ListItemElement>
        <ListItemElement className={`${BLOCK_NAME}__item`}>
          <SpanElement aria-current="page" className={`${BLOCK_NAME}__current`}>
            {page}
          </SpanElement>
        </ListItemElement>
        <ListItemElement className={`${BLOCK_NAME}__item`}>
          <PaginateButton
            disabled={page >= highestPageVisited && !hasMorePages}
            onClick={() => onPaginate(page + 1)}
            type="next"
          />
        </ListItemElement>
      </OrderedListElement>
    </NavElement>
  );
};
